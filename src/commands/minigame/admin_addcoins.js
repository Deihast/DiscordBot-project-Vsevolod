const UserInterface = require('../../models/interfaces/user.js');
const { prefix } = config;

module.exports = {
    name: 'addcoins',
    desc: 'adds demon coins to user (ADMINS ONLY)',
    usage: `${prefix}addcoins <amount_of_coins> for you or add mention to give demon coins to another user (ADMINS ONLY)`,

    async run (client, message, args) {
        let userId;
        let userTag;

        if (message.author.id !== '386436097846149120') return message.reply('You dont have permission!');
        if (!args[0]) return message.reply('Insert amount of rubies to add!');

        if (!args[1]) {
            userId = message.author.id;
            userTag = message.author.tag;
        } else {
            const userDataX = message.mentions.members.first();
            userTag = userDataX.user.tag;
            userId = userDataX.user.id;
        }

        const coins = args[0];
        
        if (!await UserInterface.checkUserValid(userId)){
            return message.reply(`This user does not have profile yet`);
        }

        try {
            await UserInterface.addDemonCoins(userId, coins);
            await message.reply(`Added ${coins} <:demonCoin:1002936075712475216> to ${userTag}`);
        } catch (err) {
            console.log(err);
            message.reply(`Invalid input! Usage: ${this.usage}`);
        }
    }
}