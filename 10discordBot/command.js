const {REST, Routes} = require('discord.js');

const commands = [
    {
        name:'ping',
        description: 'Replies with Pong!',
    }
]

const rest = new REST({version: '10'}).setToken(
    'MTM4MjA0ODg0OTE1NzQyNzMzMQ.GLZgfF.mPifnyxbS-953rga71lWjSTBIF1EeuS4fXkupw'
);

(async  () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands("1382048849157427331"), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();


