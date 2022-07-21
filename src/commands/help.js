const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config/config.json'); 

module.exports = {
    name: "help",
    desc: "information about all commands",
    usage: `${prefix}help <command_name>`,
    
    run (client, message, args) {
        const arg1 = args.shift() ?? false;

        if (!arg1) {
            const command = client.commands.map(element => `${element.name} - ${element.desc}`).join('\n');

            const help = new MessageEmbed()
                .setColor('#f8e4b1')
                .setTitle(`List of available commands: \nMy prefix is: ${prefix}`)
                .setDescription(command)
                .setFooter({ text: `For more type ${this.usage}`})

            return message.channel.send({ embeds:[help] });
        } else {
            if (!client.commands.has(arg1)) return message.reply(`Invalid command! Type ${prefix}help`);

            try {
                const cmd = client.commands.get(arg1);
                message.channel.send(cmd.usage);
            } catch (error) {
                console.log(error);
            }
        }
    }
}