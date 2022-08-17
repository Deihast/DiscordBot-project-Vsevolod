const { MessageEmbed } = require('discord.js');
const { prefix, colorValue } = require('../config/config.json');

async function createRandEmbed () {
    const num = Math.floor(Math.random() * 101);

    const number = new MessageEmbed()
        .setColor(colorValue)
        .setTitle(`YOU RANDOM NUMBER IS... || ${num} ||`)
        .setImage('https://c.tenor.com/iRcWGfkTrhkAAAAi/eneko-looking.gif');
    
    return number;
}

module.exports = {
    name: "rand",
    desc: "random number 0 - 100",
    usage: `type ${prefix}rand`,
    
    async run (client, message, args) {
        const number = await createRandEmbed();
        await message.channel.send({ embeds: [number]});
    }
}