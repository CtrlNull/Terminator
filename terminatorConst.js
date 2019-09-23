// References
const BOTCONF = require("./botconfig.json");
const CONSTS = require("./consts.json");
const Discord = require("discord.js");
const KEEP_ALIVE = require('./keep_alive.js')

const bot = new Discord.Client();
const prefix = '*'; // This is the prefix, you can change it to whatever you want.
const roleArr = ['AdminZ', 'Terminator']
const channels = [CONSTS.theCarolinas['channels'][0]['private001'], CONSTS.robPlayground['channels'][0]['muzak'], CONSTS.tekies['channels'][0]['pr001']]

bot.on('message', message => {
    // Variables - Variables make it easy to call things, since it requires less typing.
    let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    let sender = message.author; // This variable takes the message, and finds who the author is.
    let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
    let args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.
    // Commands
    // Ping
    if (msg === prefix + 'PING') { // This checks if msg (the message but in all caps), is the same as the prefix + the command in all caps.
        // Now, let's send a response.
        message.channel.send('Ping!'); // This 'sends' the message to the channel the message was in. You can change what is in the message to whatever you want.
    }


    // MESSAGE: Terminator Delete
    if (msg.startsWith(prefix + 'TERMINATE')) { // This time we have to use startsWith, since we will be adding a number to the end of the command.
        var isRole = false;
        var roleName = '';

        // We have to wrap this in an async since awaits only work in them.
        async function deleteData() {
            message.delete(); // Let's delete the command message, so it doesn't interfere with the messages we are going to delete.

            channels.forEach(ch => {
                if (message.channel.id == ch) {
                    roleArr.forEach(role => {
                        if (message.member.roles.find('name', role)) {
                            isRole = true;
                            roleName = role;
                        }
                    });
                }
            });

            if (!isRole) {
                message.channel.send('You need the \`AdminZ\` role to use this command.'); // This tells the user in chat that they need the role.
                isRole = false;
                roleName = '';
                return;
            }

            let fetched;
            do {
                fetched = await message.channel.fetchMessages({ limit: 100 });
                message.channel.bulkDelete(fetched)
                    .catch(error => {
                        message.channel.send(`Error: ${error}`); // If it finds an error, it posts it into the channel.
                        console.log(error);
                    })
            }
            while (fetched.size >= 2);
        }
        deleteData();
        isRole = false;
        roleName = '';
    }


    // MESSAGE: Purge
    if (msg.startsWith(prefix + 'PURGE')) { // This time we have to use startsWith, since we will be adding a number to the end of the command.
        // We have to wrap this in an async since awaits only work in them.
        async function purge() {
            message.delete(); // Let's delete the command message, so it doesn't interfere with the messages we are going to delete.

            if (message.channelid == CONSTS.theCarolinas['channels'][0]['private001']) {
                if ((!message.member.roles.find("name", "Terminator"))|| (!message.member.roles.find("name", "BOT")) || (!message.member.roles.find("name", "AdminZ"))) {
                    message.channel.send('You need the \`Terminator\` or \`AdminZ\` role to use this command.');
                }

                if (!message.member.roles.find("name", "AdminZ")) {}
            }

            if (message.channel.id == CONSTS.robPlayground['channels'][0]['muzak']) {
                // Now, we want to check if the user has the `bot-commander` role, you can change this to whatever you want.
                if (!message.member.roles.find("name", "AdminZ")) { // This checks to see if they DONT have it, the "!" inverts the true/false
                    message.channel.send('You need the \`AdminZ\` role to use this command.'); // This tells the user in chat that they need the role.
                    return; // this returns the code, so the rest doesn't run.
                }
            }
            if (message.channel.id == CONSTS.tekies['channels'][1]['botTest']) {
                // Now, we want to check if the user has the `bot-commander` role, you can change this to whatever you want.
                if (!message.member.roles.find("name", "Terminator")) { // This checks to see if they DONT have it, the "!" inverts the true/false
                    message.channel.send('You need the \`Terminator\` role to use this command.'); // This tells the user in chat that they need the role.
                    return; // this returns the code, so the rest doesn't run.
                }
            }

            // We want to check if the argument is a number
            if (isNaN(args[0])) {
                // Sends a message to the channel.
                message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>'); //\n means new line.
                // Cancels out of the script, so the rest doesn't run.
                return;
            }

            const fetched = await message.channel.fetchMessages({ limit: args[0] }); // This grabs the last number(args) of messages in the channel.
            console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting

            // Deleting the messages
            message.channel.bulkDelete(fetched)
                .catch(error => {
                    message.channel.send(`Error: ${error}`);
                    console.log(error);
                }); // If it finds an error, it posts it into the channel.

        }
        // We want to make sure we call the function whenever the purge command is run.
        purge(); // Make sure this is inside the if(msg.startsWith)
    }
});

// Listener Event: Runs whenever the bot sends a ready event (when it first starts for example)
bot.on('ready', () => {
    // We can post into the console that the bot launched.
    console.log('Bot started.');

});

bot.login(BOTCONF.token);

