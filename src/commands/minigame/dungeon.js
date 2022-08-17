const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const UserInterface = require('../../models/interfaces/user.js');
const { prefix, colorValue } = config;

const name = 'dungeon';
const desc = 'enter the dungeon to get reward (exp, rubies, demon coins)';
const usage = `${prefix}dungeon solo/group`;

async function run (client, message, args) {
    if (!args[0]) return message.reply('Choose between solo or group dungeon');

    if (!await UserInterface.checkUserValid(message.author.id)){
        return message.reply(`You do not have profile!\nType ${prefix}help minigame to create one`);
    }

    const dungeonType = args[0];

    const soloDungeon = new MessageEmbed()
            .setColor(colorValue)
            .setTitle('=========== SOLO DUNGEON INFO ===========')
            .setDescription('DUNGEON CLEARED!')
            .addFields( {name: 'Your reward: ', value: ' 150 <:exp:1002943265726791710> | 25 <:ruby:1002936046222311485> | 5 <:demonCoin:1002936075712475216> !'})
            .setImage('attachment://chest.png');

    switch (dungeonType) {
        case 'solo':
            const userId = message.author.id;
            UserInterface.addExp(userId, 150);
            UserInterface.addRubies(userId, 25);
            UserInterface.addDemonCoins(userId, 5);

            return await message.channel.send({ embeds: [soloDungeon], files: ['src/imgs/chest.png'] });
        case 'group':
            break;
    }

    const players = [
        { 
            id: message.author.id, 
            name: message.author.tag 
        }
    ];

    UserInterface.addExp(players[0].id, 250);
    UserInterface.addRubies(players[0].id, 50);
    UserInterface.addDemonCoins(players[0].id, 10);
    
    const ready = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId('ready')
            .setLabel('READY')
            .setStyle('SUCCESS')
    )

    const joinMessage = await message.channel.send({content: `${message.author.tag} is gathering group for GROUP DUNGEON! Push READY to join!`, components: [ready] });

    const filter = (interaction) => {
        if (interaction.user.id !== players[0].id) {
            return true;
        } else {
            interaction.reply('You have already joined the group!');

            setTimeout(() => {
                return interaction.deleteReply();
            }, 800);
        }
    }

    const collector = message.channel.createMessageComponentCollector({
        filter,
        max: 2,
        time: 10000
    });

    collector.on('collect', async (interactionButton) => {
        if (interactionButton.customId === 'ready') {
            players.push({ id: interactionButton.user.id, name: interactionButton.user.tag });
            UserInterface.addExp(interactionButton.user.id, 250);
            UserInterface.addRubies(interactionButton.user.id, 50);
            UserInterface.addDemonCoins(interactionButton.user.id, 10);
            await interactionButton.reply(`${interactionButton.user.tag} has joined the group!`);

            setTimeout(() => {
                interactionButton.deleteReply();
            }, 800);  
        }
    });

    collector.on('end', async () => {
        await joinMessage.delete();
        const playersInfo = players.map(item => item.name).join('\n')

        const joinedPlayers = new MessageEmbed()
            .setColor(colorValue)
            .setTitle('========== GROUP DUNGEON INFO ==========')
            .setDescription('DUNGEON CLEARED!')
            .addFields( {name: 'Players joined:', value: playersInfo })
            .addFields( {name: 'Reward: ', value: '250 <:exp:1002943265726791710> | 50 <:ruby:1002936046222311485> | 10 <:demonCoin:1002936075712475216> for each member!'})
            .setImage('attachment://chest.png');

        setTimeout(() => {
            message.channel.send({ embeds: [joinedPlayers], files: ['src/imgs/chest.png'] });
        }, 3000);
    });
}

module.exports = {
    name,
    desc,
    usage,
    run
}