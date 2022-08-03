const { MessageEmbed } = require('discord.js');
const { prefix } = config;

module.exports = {
    name: "info",
    desc: "info about bot",
    usage: `type ${prefix}info`,

    run (client, message, args) { 
        
        const info = new MessageEmbed()
            .setColor('#ECEA6C')
            .setTitle('INFO')
            .setURL('https://github.com/Deihast/DiscordBot-project-Vsevolod')
            .setDescription('This bot was created for educational purpose')
            .addFields (
                { name: '\u200B', value: '\u200B' },
                { name: `Type ${prefix}help to start`, value: `${prefix}help\n`},
                { name: 'Invite bot: ' , value: 'https://discord.com/api/oauth2/authorize?client_id=994219616396136460&permissions=8&scope=bot%20applications.commands'},
                { name: 'GitHub link: ', value: 'https://github.com/Deihast' },
                { name: 'Authors ', value: 'Code: Vsevolod (Astrein/Ecne) \nGraphic design: Yana (Yanysh)'},
            )
            .setImage('attachment://info.jpg')
            .setFooter({ text: 'Beep Boop' })

        message.channel.send({ embeds: [info], files: ['src/imgs/info.jpg'] });
    }
}