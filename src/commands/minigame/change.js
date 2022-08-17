const { MessageActionRow, MessageButton } = require('discord.js');
const UserInterface = require('../../models/interfaces/user.js');
const { prefix } = config;
const { roles } = require('../../config/roles.js');

const name = 'change';
const desc = 'change profile information: name, gender, role';
const usage = `${prefix}change <option>`;

async function run (client, message, args) {
    const userId = message.author.id;
    const option = args[0];

    if (!await UserInterface.checkUserValid(userId)){
        return message.reply('Profile does not exist');
    }

    const gender = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId('Male')
            .setLabel('MALE')
            .setStyle('PRIMARY'),

            new MessageButton()
            .setCustomId('Female')
            .setLabel('FEMALE')
            .setStyle('PRIMARY')
    )

    const role = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId('Warrior')
            .setLabel('Warrior')
            .setStyle('PRIMARY'),

        new MessageButton()
            .setCustomId('Priest')
            .setLabel('Priest')
            .setStyle('PRIMARY'),

        new MessageButton()
            .setCustomId('Archer')
            .setLabel('Archer')
            .setStyle('PRIMARY'),

        new MessageButton()
            .setCustomId('Assassin')
            .setLabel('Assassin')
            .setStyle('PRIMARY'),

        new MessageButton()
            .setCustomId('Mage')
            .setLabel('Mage')
            .setStyle('PRIMARY'),   
    )
    
    if (option === 'name') {
        if (!args[1]) return message.reply('Invalid input');

        const newValue = args[1];
        await UserInterface.changeName(userId, newValue);
        await message.reply('Name updated');
        return;
    } else if (option === 'gender') {
        await message.channel.send({ components: [gender] });
    } else if (option === 'role') {
        await message.channel.send({ components: [role] });
    } else return message.reply('Invalid option, you can change: name, gender or role only');

    const filter = (interaction) => {
        if (interaction.user.id === message.author.id) return true;
        return interaction.reply('You cant do this.');
    }
    
    const collector = message.channel.createMessageComponentCollector({
        filter,
    });

    collector.on('collect', async (interactionButton) => {
        const id = interactionButton.customId;
    
        if (id === 'Male' || id === 'Female') {
            const newValue = id;
            await UserInterface.changeGender(userId, newValue);
            await interactionButton.update({ content: 'Gender updated!', components: [] });
            
            return collector.stop();
        }
        else if (roles.some(item => item === id )) {
            const newValue = id;
            await UserInterface.changeRole(userId, newValue);
            await interactionButton.update({ content: 'Role updated!', components: [] });
            return collector.stop();
        } 
    });

    collector.on('end', () => {
    });
}

module.exports = {
    name,
    desc,
    usage,
    run
}