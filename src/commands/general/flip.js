const { MessageEmbed } = require('discord.js');
const { prefix, colorValue } = config;

const name = 'flip';
const desc = 'heads or tails';
const usage = `flip the coin ${prefix}flip`;

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

async function run (client, message, args) {
    const flipEmb = await createFlipEmbed();

    await message.channel.send( { embeds: [flipEmb]} );
}

module.exports = {
    name,
    desc,
    usage,
    run
}