const { MessageEmbed } = require('discord.js');
const { prefix, colorValue } = require('../config/config.json');

const coin = [
    'HEADS',
    'TAILS'
]

async function createFlipEmbed () {
    const i = Math.floor(Math.random() * 2);

    const flip = new MessageEmbed()
        .setColor(colorValue)
        .setTitle('Heads or tails?')
        .setDescription(` ** ${coin[i]} ! **`)
        .setImage('https://c.tenor.com/-wn76VhsrtUAAAAd/kanao-kanao-tsuyuri.gif');

    return flip;
}

module.exports = {
    name: 'flip',
    desc: 'heads or tails',
    usage: `flip the coin ${prefix}flip`,

    async run (client, message, args) {
        const flipEmb = await createFlipEmbed();

        await message.channel.send( { embeds: [flipEmb]} );
    }
}