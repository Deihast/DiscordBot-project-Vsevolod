const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config/config.json');

module.exports = {
    name: "rand",
    desc: "random number 0 - 100",
    usage: `type ${prefix}rand`,
    
    async run (client, message, args) {
        const num = Math.floor(Math.random() * 101);

        const number = new MessageEmbed()
            .setColor('#84fc38')
            .setTitle(`YOU RANDOM NUMBER IS... || ${num} ||`)
            .setImage('https://c.tenor.com/iRcWGfkTrhkAAAAi/eneko-looking.gif')

        await message.channel.send({ embeds: [number]});
    }
}