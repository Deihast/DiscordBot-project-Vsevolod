const UserInterface = require('../../models/interfaces/user.js');
const { prefix } = config;

const name = 'addrubies';
const desc = 'adds rubies to user (ADMINS ONLY)';
const usage =  `${prefix}addrubies <amount_of_rubies> for you or add mention to give rubies to another user (ADMINS ONLY)`;

async function run (client, message, args) {
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

    const rubies = args[0];
    
    if (!await UserInterface.checkUserValid(userId)){
        return message.reply(`This user does not have profile yet`);
    }

    try {
        await UserInterface.addRubies(userId, rubies);
        await message.reply(`Added ${rubies} <:ruby:1002936046222311485> to ${userTag}`);
    } catch (err) {
        console.log(err);
        message.reply(`Invalid input! Usage: ${this.usage}`);
    }
}

module.exports = {
    name,
    desc,
    usage,
    run
}