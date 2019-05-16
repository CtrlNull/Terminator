const BOTCONF = require("./botconfig.json");
const CONSTS = require("./consts.json");
const Discord = require("discord.js");

const bot = new Discord.Client();

bot.login(BOTCONF.token).then(() => {
    console.log("I am ready");
    // Get Guild ID's
    var ROBPlayground = bot.guilds.get(CONSTS.robPlayground['guildId']);
    
    if (ROBPlayground && ROBPlayground.channels.get(CONSTS.robPlayground['channels'][0]['muzak'])) {
        ROBPlayground.channels.get(CONSTS.robPlayground['channels'][0]['muzak']).send("Purge Complete").then(() => console.log("RobPlayground Init"));
    }else {
        console.log("ROBs Failed")
    }
    
    var TEKy = bot.guilds.get(CONSTS.tekies['guildId']);
    if (TEKy && TEKy.channels.get(CONSTS.tekies['channels'][0]['pr001'])) {
        TEKy.channels.get(CONSTS.tekies['channels'][0]['pr001']).send("Purge Complete").then(() => console.log('Tekies initSent'));
    } else {
        console.log("Failed");
    }
    bot.destroy();
});
