const { MessageActionRow, MessageButton } = require('discord.js');
const UserInterface = require('../../models/interfaces/user.js');
const { prefix } = config;

const name = 'remove-profile';
const desc = 'delete your profile';
const usage = `${prefix}remove-profile`;

async function run (client, message, args) {
    const userId = message.author.id;

    if (!await UserInterface.checkUserValid(userId)){
        return message.reply('Profile does not exist');
    }

    const remove = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId('yes')
            .setLabel('YES')
            .setStyle('SUCCESS'),
        new MessageButton()
            .setCustomId('no')
            .setLabel('NO')
            .setStyle('DANGER'),
    )

    await message.reply({ content: 'Delete profile? :x: ', components: [remove] });

    const filter = (interaction) => {
        if (interaction.user.id === message.author.id) return true;
        return interaction.reply('You cant do this.');
    }
    
    const collector = message.channel.createMessageComponentCollector({
        filter,
    });

    collector.on('collect', async (interactionButton) => {
        const id = interactionButton.customId;
    
        if (id === 'yes') {
            await UserInterface.deleteUser(userId);
            await interactionButton.update({ content: 'Your profile has been deleted', components:[] });
            return collector.stop();
        }
        else {
            await interactionButton.update({ content: 'Cancelled', components:[] });
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