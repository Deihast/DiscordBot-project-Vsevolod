const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection } = require ('discord.js');
const { prefix, clientID, guildID, intentsValue } = require('./config/config.json');
const config  = require('./config/config.json');
require('dotenv').config({ path: path.resolve(__dirname, '../src/.env')});
const initDb = require('./initDb.js');

global.config = config;

const client = new Client({ intents: intentsValue, allowedMentions:["users"]});

client.commands = new Collection();
client.minigameCommands = new Collection();

client.on ("ready", async function() {
    initDb(config);
    client.user.setActivity("поїдання млинців", {type: "COMPETING"});
    console.log(`Logged in as ${client.user.tag}`);
    await loadGeneralCommands();
    await loadMinigameCommands();
});

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    let command;

    if (!client.commands.get(commandName)){
        command = client.minigameCommands.get(commandName);
    } else {
        command = client.commands.get(commandName);
    }
    
    try {
        await command.run(client, message, args);
    } catch (error) {
        await message.reply(`Invalid command! Type ${prefix}help`);
        console.log(error);
    }
});

async function loadGeneralCommands() {
    const commandsPath = path.join(__dirname, 'commands/general');
    const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandsFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        client.commands.set(command.name, command);
    }

    console.log(`Loaded ${commandsFiles.length} general commands!`);
}

async function loadMinigameCommands() {
    const commandsPath = path.join(__dirname, 'commands/minigame');
    const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandsFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        client.minigameCommands.set(command.name, command);
    }

    console.log(`Loaded ${commandsFiles.length} minigame commands!`);
}

client.login(process.env.TOKEN);