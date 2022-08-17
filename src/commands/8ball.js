const { MessageEmbed } = require('discord.js');
const { prefix, colorValue } = require('../config/config.json');

const name = '8ball';
const desc = 'get answer on your question';
const usage = `ask the question, then type ${prefix}8ball`;

const ball = new MessageEmbed()
    .setColor(colorValue)
    .setDescription(`Asking the :8ball: your question... Please wait`);

const answer = [
    'Yes',
    'Maybe',
    'Definitely not',
    'Try again',
    'No',
    'Without a doubt',
    'I don`t care, lol',
    'Most likely',
    'Better not tell you now',
    'Don`t count on it',
    'Yes — definitely',
    'It is certain',
    'As I see it, yes ',
    'Cannot predict now',
    'Very doubtful'
];

async function createBallEmbed () {
    const ballChoice = Math.floor(Math.random() * answer.length);

    const answermsg = new MessageEmbed()
        .setColor(colorValue)
        .setDescription(`Mystic ball :8ball: replied with: ${answer[ballChoice]}`);
    
    return answermsg;
}

async function run (client, message, args) {
    if (!args[0]) return  message.reply('You... should ask the question, you know?');
        
    await message.channel.send( {embeds: [ball]});

    const answermsg = await createBallEmbed();

    setTimeout(() => {
        message.channel.send( {embeds: [answermsg]} );
    }, 2000);
}

module.exports = {
    name,
    desc,
    usage,
    run
}