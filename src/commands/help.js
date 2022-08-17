const { MessageEmbed } = require('discord.js');
const { prefix, colorValue } = require('../config/config.json'); 

async function createCommandHelpEmbed (cmd, arg1) {
    try {
        const cmdHelp = cmd.get(arg1);
        return cmdHelp.usage;
    } catch (error) {
        console.log(error);
    }
} 

module.exports = {
    name: "help",
    desc: "information about all commands",
    usage: `${prefix}help <command_name>`,
    
    async run (client, message, args) {
        const arg1 = args.shift() ?? false;

        if (!arg1) {
            const command = client.commands.map(element => `${element.name} - ${element.desc}`).join('\n');

            const help = new MessageEmbed()
                .setColor(colorValue)
                .setTitle(`List of available commands: \nMy prefix is: ${prefix}`)
                .setDescription(command)
                .setFooter({ text: `For more type ${this.usage}`})

            return message.channel.send({ embeds:[help] });
        } 
        
        if (!client.commands.has(arg1)) return message.reply(`Invalid command! Type ${prefix}help`);
        
        const commandUsage = await createCommandHelpEmbed (client.commands, arg1);
        await message.channel.send(commandUsage);
    }
}