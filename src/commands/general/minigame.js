const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const UserInterface = require('../../models/interfaces/user.js');
const { prefix } = config;

module.exports = {
    name: "minigame",
    desc: "create profile and start minigame",
    usage: `type ${prefix}minigame`,

    async run (client, message, args) {

        if (await UserInterface.checkUserValid(message.author.id)){
            return message.reply(`You already have profile!\nType ${prefix}help minigame for more commands`);
        }

        const userData = {
            gid: message.guild.id,
            uid: message.author.id,
            name: message.author.username,
            gender: '***',
            role: '***',
            wallet: 0,
            level: 1,
        }

        const roles = [
            'Warrior',
            'Priest',
            'Archer',
            'Assassin',
            'Mage',
        ]

        const start = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('start')
                .setLabel('START')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('cancel')
                .setLabel('CANCEL')
                .setStyle('DANGER'),
        )

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

        const end = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('end')
                .setLabel('End')
                .setStyle('SUCCESS')
        )

        const register = new MessageEmbed()
            .setColor('#ECEA6C')
            .setTitle('Welcome, Adventurer! Please answer some questions and we can complete your registration!')
            .setImage('attachment://register.jpg')
            .setDescription('Choose your gender and role below. You can change them later.')
        
        
        const registerMessage = await message.channel.send({ embeds: [register], files: ['src/imgs/register.jpg'] });
        await message.channel.send({ components: [start] });
    
        const filter = (interaction) => {
            if (interaction.user.id === message.author.id) return true;
            return interaction.reply('You cant do this.');
        }
        
        const collector = message.channel.createMessageComponentCollector({
            filter,
        });

        collector.on('collect', async (interactionButton) => {
            const id = interactionButton.customId;
        
            if (id === 'start') await interactionButton.update({ content: 'Choose gender :male_sign: / :female_sign: ', components: [gender] });
            else if (id === 'Male' || id === 'Female') {
                userData.gender = id;
                await interactionButton.update({ content: 'Choose role :crossed_swords:', components: [role] })
            }
            else if(roles.some(item => item === id )) {
                userData.role = id;
                await interactionButton.update( { content: 'Registration complete!', components : [end]})
            } else if (id === 'cancel') {
                await interactionButton.update( { content: 'Registration canceled, you can start again any time!', components: [] });
                await registerMessage.delete();
                return collector.stop();
            }
            else {
                try {
                    const user = UserInterface.createUser(userData);
                } catch (error) {
                    console.log(error);
                }
                await interactionButton.update( { content: `Good luck, ${message.author.username} :trophy: `, components: [] });
                await registerMessage.delete();
                return collector.stop();
            }
        })

        collector.on('end', () => {
        })
    }
}