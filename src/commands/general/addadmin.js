const AdminInterface = require('../../models/interfaces/admin.js');
const crypto = require('crypto');
const { prefix } = config;
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../config/config.json')});
const secret = process.env.SECRET;

const name = 'admin';
const desc = 'added you or another user to admin group';
const usage = `${prefix}admin <your_password_here> @userMention`;

async function run (client, message, args) {
    await message.delete();

    if (message.author.id !== '386436097846149120') return message.reply('You have no permission to do this command');
    if (!args[0]) return message.channel.send('Enter the password after the command, please');
    if (args[0].length < 4) return message.channel.send('Password must be at least 4 characters');
    
    let login;
    let uid;

    const password = crypto.createHmac('sha256', secret)
        .update(args[0])
        .digest('hex');
   
    const userData = message.mentions.members.first();
    if (userData) {
        uid = userData.user.id;
        login = userData.user.username;
    } else {
        uid = message.author.id;
        login = message.author.username;
    }

    if (await AdminInterface.adminIsValid(uid)) return message.channel.send('Admin has been already added!');
    
    const adminData = {
        uid,
        login,
        password
    }

    const admin = await AdminInterface.createAdmin(adminData);

    await message.channel.send('Admin added!');
}

module.exports = {
    name,
    desc,
    usage,
    run
}