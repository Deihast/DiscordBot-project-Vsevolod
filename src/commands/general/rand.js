const { MessageEmbed } = require('discord.js');
const { prefix, colorValue } = config; 

const name = "rand";
const desc = "random number 0 - 100";
const usage = `type ${prefix}rand`;

async function createRandEmbed () {
    const num = Math.floor(Math.random() * 101);

    const number = new MessageEmbed()
        .setColor(colorValue)
        .setTitle(`YOU RANDOM NUMBER IS... || ${num} ||`)
        .setImage('https://c.tenor.com/iRcWGfkTrhkAAAAi/eneko-looking.gif');
    
    return number;
}

async function run (client, message, args) {
    const number = await createRandEmbed();
    await message.channel.send({ embeds: [number]});
}

module.exports = {
    name,
    desc,
    usage,
    run 
}