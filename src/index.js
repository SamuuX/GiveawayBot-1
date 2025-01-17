require('./console/watermark')
const { Client, Partials, Collection } = require('discord.js');
const colors = require('colors');
const config = require('./config/config.json');
require('dotenv').config()

const client = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildPresences",
        "GuildMessageReactions",
        "DirectMessages",
        "MessageContent",
        "GuildVoiceStates"
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction
    ]
});

if(!process.env.MONGODB) {
    console.log("[WARN] MongoDB URL is required! put your MongoDB URI in config file".yellow.bold + "\n")
    return process.exit();
}

if (!process.env.TOKEN) {
    console.log("[WARN] Token for discord bot is required! put your token in config file".yellow.bold + "\n")
    return process.exit();
};

require("./database/connect")();

client.commands = new Collection()
client.events = new Collection()
client.slash = new Collection()
client.aliases = new Collection()
client.config = require("./config/config.json")

module.exports = client;

["command", "event", "slash"].forEach(file => {
    require(`./handlers/${file}`)(client);
});

client.login(process.env.TOKEN)
    .catch((err) => {
        console.log("[CRUSH] Something went wrong while connecting to your bot" + "\n");
        console.log("[CRUSH] Error from DiscordAPI :" + err);
        process.exit();
    })

process.on("unhandledRejection", async (err) => {
    if(err.code == 10008 || err.code == 10062) return;
    console.log(`[ANTI - CRUSH] Unhandled Rejection : ${err}`.red.bold)
})
