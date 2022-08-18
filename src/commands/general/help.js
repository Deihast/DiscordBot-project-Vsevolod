const { MessageEmbed } = require('discord.js');
const { prefix, colorValue } = config;

const name = "help";
const desc = "information about all commands";
const usage = `${prefix}help <command_name>`;

async function run (client, message, args) {
    const arg1 = args.shift() ?? false;

    if (!arg1) {
        const command = client.commands.map(element => `${element.name} - ${element.desc}`).join('\n');

        const help = new MessageEmbed()
            .setColor(colorValue)
            .setTitle(`List of available commands: \nMy prefix is: ${prefix}`)
            .setDescription(command)
            .setFooter({ text: `For more type ${this.usage}`})

        return message.channel.send({ embeds: [help] });
    } 
    
    if (!client.commands.has(arg1) && !client.minigameCommands.has(arg1)) return message.reply(`Invalid command! Type ${prefix}help`);

    if (arg1 === 'minigame') {
        const commandMinigame = client.minigameCommands.map(item => `${item.name} - ${item.desc}`).join('\n');

        const minigame = new MessageEmbed()
            .setColor(colorValue)
            .setTitle(`List of available commmands for minigame:`)
            .setDescription(commandMinigame)
            .setFooter({ text: 'Something will be here'})
        return message.channel.send({ embeds: [minigame] });
    }
    
    try {
        const cmd =  client.commands.get(arg1) ?? client.minigameCommands.get(arg1);
        message.channel.send(cmd.usage);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    name,
    desc,
    usage,
    run
}