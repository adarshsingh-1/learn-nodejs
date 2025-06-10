const { Client, GatewayIntentBits } = require('discord.js');
const connectDB = require('./connect');
const ShortUrl = require('./models/shortUrl');
const shortid = require('shortid');


connectDB();

const client = new Client({
    intents : [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ]
});


client.on('messageCreate', async(message) => {
    if(message.author.bot) return; // Ignore messages from bots
    if(message.content.startsWith("create")){
        const url = message.content.split("create")[1];
        const shortId = shortid.generate();
        const newLink = new ShortUrl({ shortId, originalUrl: url });
        await newLink.save();
        return message.reply({
            content: `Your short ID is: \`${shortId}\``,
            ephemeral: true // This makes the reply visible only to the user who sent the command
        })
    }
    message.reply({
        content: 'Hello, world! This is a reply from the bot.',
    })

    // console.log(message.content);// Log the message content to the console
})





client.on('interactionCreate',interaction => {
    console.log(interaction);
    interaction.reply('Honk!!')
    
})
client.login('MTM4MjA0ODg0OTE1NzQyNzMzMQ.GLZgfF.mPifnyxbS-953rga71lWjSTBIF1EeuS4fXkupw')