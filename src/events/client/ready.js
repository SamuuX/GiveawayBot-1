const client = require('../../index');
const colors = require('colors');

module.exports = {
    name: "ready"
};
const { ActivityType } = require('discord.js')
client.once('ready', async () => {
client.user.setPresence({
    activities: [
      {
        name: `Modulos de sorteos`,
        type: ActivityType.Listening,
        // url: 'https://twitch.tv/Samuu_X'
      }
    ],
    status: 'idle'
  })
    console.log("----------------------------------------".white);
    console.log(`[READY] ${client.user.tag} is up and ready to go.`.bold)
    console.log("----------------------------------------".white);
})