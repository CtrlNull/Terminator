const BOTCONF = require("./botconfig.json");
const CONSTS = require("./consts.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.login(BOTCONF.token).then(() => {
    console.log("I am ready");
    // Get Guild ID's
    var ROBPlayground = bot.guilds.get(CONSTS.robPlayground['guildId']);
    console.log(ROBPlayground);

    var TEKy = bot.guild.get(CONSTS.tekies['guildId']);
    console.log(TEKy)



    // if (guild && guild.channels.get(channelId)) {
    //     guild.channels.get(channelId).send("Terminator Initialized").then(() => client.destroy());
    // } else {
    //     console.log("nope");
    //     //if the bot doesn't have guild with the id guildid
    //     // or if the guild doesn't have the channel with id channelid
    // }
    client.destroy();
});
