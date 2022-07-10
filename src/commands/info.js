const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config/config.json'); 

module.exports = {
    name: "info",
    desc: "info about bot",
    usage: `type ${prefix}info`,

    run (client, message, args) { 

        const info = new MessageEmbed()
            .setColor('#84fc38')
            .setTitle('INFO')
            .setURL('https://github.com/Deihast/DiscordBot-project-Vsevolod')
            .setDescription('This bot created for educational purpose')
            .addFields (
                { name: '\u200B', value: '\u200B' },
                { name: `Type ${prefix}help to start`, value: `${prefix}help\n`},
                { name: 'Invite bot' , value: 'https://discord.com/api/oauth2/authorize?client_id=994219616396136460&permissions=8&scope=bot%20applications.commands'},
                { name: 'GitHub link', value: 'https://github.com/Deihast' },
            )
            .setImage('attachment://info.jpg')
            .setFooter({ text: 'Beep Boop' })

        message.channel.send({ embeds: [info], files: ['./imgs/info.jpg'] });
    }
}