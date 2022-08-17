const { MessageEmbed } = require('discord.js');
const { createCanvas, loadImage, registerFont } = require('canvas');
const UserInterface = require('../../models/interfaces/user.js');
const path = require('node:path');
const fs = require('fs');
const { prefix, colorValue } = config;

const name = 'profile';
const desc = 'get information about your or someone`s profile';
const usage = `${prefix}profile or ${prefix}profile @UserMention`;

async function createProfile (userId) {
    const id = userId;
    const user = await UserInterface.findUserById(id);

    registerFont(path.join(__dirname, '../../imgs/userProfile/Ubuntu-L.ttf'), { family: 'Ubuntu' });

    const canvas = createCanvas(400, 200);
    const ctx = canvas.getContext('2d');

    const bg = await loadImage(
        path.join(__dirname, '../../imgs/userProfile/bg.png')
    )

    ctx.drawImage(bg, 0, 0)

    const pfp = await loadImage(
        path.join(__dirname, `../../imgs/userProfile/${user.gender}_Profile.png`)
    )

    ctx.drawImage(pfp, 33, 80);
    ctx.font = '16pt Ubuntu Light';
    ctx.fillText(`Level: ${user.level}`, 158, 105);
    ctx.fillText(`Name: ${user.name}`, 158, 129);
    ctx.fillText(`Gender: ${user.gender}`, 158, 151);
    ctx.fillText(`Role: ${user.role}`, 158, 173);
    
    const attachment = canvas.toBuffer('image/png')
    fs.writeFileSync(path.join(__dirname, `../../imgs/profiles/pr_${id}.png`), attachment);
}

async function deleteProfile (userId) {
    fs.unlinkSync(path.join(__dirname, `../../imgs/profiles/pr_${userId}.png`));
}

async function run (client, message, args) {
    let userId;

    if (!args[0]) {
        userId = message.author.id;
    } else {
        const userDataX = message.mentions.members.first();
        userId = userDataX.user.id;
    }
    
    if (!await UserInterface.checkUserValid(userId)){
        return message.reply(`Profile does not exist yet!\nType ${prefix}minigame to create one`);
    }

    await createProfile(userId);

    const user = await UserInterface.findUserById(userId);

    const guidProfile = new MessageEmbed()
        .setColor(colorValue)
        .setTitle('============== Minigame profile ==============')
        .setDescription(`

            <:lvl:1002951684831588463> Level: ${user.level} 
            <:exp:1002943265726791710> Exp: ${user.exp} / 5 000 xp
            
            :moneybag: Balance:
            - Rubies: ${user.rubies}  <:ruby:1002936046222311485> 
            - Demon Coins: ${user.demonCoins}  <:demonCoin:1002936075712475216>
        `)
        .addFields( {name: '===============================================', value: '***Personal AGID:***'})
        .setImage(`attachment://pr_${userId}.png`)
   
    await message.channel.send( {embeds: [guidProfile], files: [`src/imgs/profiles/pr_${userId}.png`] } );
    await deleteProfile(userId);
}

module.exports = {
    name,
    desc,
    usage,
    run
}