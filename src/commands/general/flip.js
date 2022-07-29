const { MessageEmbed } = require('discord.js');
const { prefix } = config;

module.exports = {
    name: 'flip',
    desc: 'heads or tails',
    usage: `flip the coin ${prefix}flip`,

    async run (client, message, args) {
        const i = Math.floor(Math.random() * 2);

        const coin = [
            'HEADS',
            'TAILS'
        ]

        const flip = new MessageEmbed()
            .setColor('#ECEA6C')
            .setTitle('Heads or tails?')
            .setDescription(` ** ${coin[i]} ! **`)
            .setImage('https://c.tenor.com/-wn76VhsrtUAAAAd/kanao-kanao-tsuyuri.gif')
        
        await message.channel.send({ embeds: [flip]});
    }
}