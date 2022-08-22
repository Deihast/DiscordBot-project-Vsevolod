const UserInterface = require('../../models/interfaces/user.js');
const { prefix } = config;

const name = 'addexp';
const desc = 'adds exp to user (ADMINS ONLY)';
const usage =  `${prefix}addexp <amount_of_exp> for you or add mention to give exp to another user (ADMINS ONLY)`;

async function run (client, message, args) {
    let userId;
    let userTag;

    if (message.author.id !== '386436097846149120') return message.reply('You dont have permission!');
    if (!args[0]) return message.reply('Insert amount of EXP to add!');

    if (!args[1]) {
        userId = message.author.id;
        userTag = message.author.tag;
    } else {
        const userDataX = message.mentions.members.first();
        userId = userDataX.user.id;
        userTag = userDataX.user.tag;
    }

    const exp = args[0];

    if (!await UserInterface.checkUserValid(userId)){
        return message.reply(`This user does not have profile yet`);
    }

    try {
        await UserInterface.addExp(userId, exp);
        await message.reply(`Added ${exp} <:exp:1002943265726791710> to ${userTag}`);
    } catch (err) {
        message.reply(`Invalid input! Usage: ${this.usage}`);
    }
}

module.exports = {
    name,
    desc,
    usage,
    run
}