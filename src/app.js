const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection } = require ('discord.js');
const { prefix, intentsValue } = require('./config/config.json');
require('dotenv/config');

const client = new Client({ intents: intentsValue, allowedMentions:["users"]});

client.commands = new Collection();

client.on ("ready", function() {
    client.user.setActivity("поїдання млинців", {type: "COMPETING"});
    console.log(`Logged in as ${client.user.tag}`);
    loadCommands();
});

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    try {
        await command.run(client, message, args); 
    } catch (error) {
        await message.reply(`Invalid command! Type ${prefix}help`);
        console.log(error);
    }
});

async function loadCommands() {
    const commandsPath = path.join(__dirname, 'commands');
    const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandsFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        client.commands.set(command.name, command);
    }

    console.log(`Loaded ${commandsFiles.length} commands!`);
}

client.login(process.env.TOKEN);