const BOTCONF = require("./botconfig.json");
const CONSTS = require("./consts.json");
const Discord = require("discord.js");

const bot = new Discord.Client();

bot.login(BOTCONF.token).then(() => {
    console.log("I am ready");
    // Get Guild ID's

    // Hangout house
    var ROBPlayground = bot.guilds.get(CONSTS.robPlayground['guildId']);
    
    if (ROBPlayground && ROBPlayground.channels.get(CONSTS.robPlayground['channels'][0]['muzak'])) {
        ROBPlayground.channels.get(CONSTS.robPlayground['channels'][0]['muzak']).send("5 minutes until TERMINATION").then(() => console.log("RobPlayground Init"));
    }else {
        console.log("ROBs Failed")
    }
    // Tekies Server
    var TEKy = bot.guilds.get(CONSTS.tekies['guildId']);
    if (TEKy && TEKy.channels.get(CONSTS.tekies['channels'][0]['pr001'])) {
        TEKy.channels.get(CONSTS.tekies['channels'][0]['pr001']).send("5 minutes until TERMINATION").then(() => console.log('Tekies initSent'));
    } else {
        console.log("Failed");
    }

    // The Carolina's Server 
    var carolinaServ = bot.guilds.get(CONSTS.theCarolinas['guildId']);
    if (carolinaServ && carolinaServ.channels.get(CONSTS.theCarolinas['channels'][0]['private001'])) {
        carolinaServ.channels.get(CONSTS.theCarolinas['channels'][0]['private001']).send("5 minutes until TERMINATION").then(() => console.log('The Carolinas warnning sent'));        
    } else {
        console.log("Failed");
    }

    bot.destroy();
});
