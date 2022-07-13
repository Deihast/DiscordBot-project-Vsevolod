const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config/config.json');

module.exports = {
    name: '8ball',
    desc: 'get answer on your question',
    usage: `ask the question, then type ${prefix}8ball`,
    
    async run (client, message, args) {

        if (!args[0]) return  message.reply('You... should ask the question, you know?');
        
        const ball = new MessageEmbed()
            .setColor('#84fc38')
            .setDescription(`Asking the :8ball: your question... Please wait`)

        await message.channel.send( {embeds: [ball]});

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

        const ballChoice = Math.floor(Math.random() * answer.length);

        setTimeout(() => {
            const answermsg = new MessageEmbed()
                .setColor('#84fc38')
                .setDescription(`Mystic ball :8ball: replied with: ${answer[ballChoice]}`)

            message.channel.send( {embeds: [answermsg]} );
        }, 2000);
    }
}