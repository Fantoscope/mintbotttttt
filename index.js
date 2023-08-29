const { token, prefix } = require('./config');
const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client({
    intents: Object.keys(Discord.GatewayIntentBits).map((a)=>{
      return Discord.GatewayIntentBits[a] // all intents
    }),
  });

client.commands = new Discord.Collection()

var cmdFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of cmdFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.once(Discord.Events.ClientReady, c => {
    console.log(`logged in as : ${c.user.tag}`);
    client.user.setActivity('oiled up men thug shaking', { type: 'WATCHING' })
});

client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) {return};
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  try {
      client.commands.get(command).execute(message, args, prefix, client)
    } catch {
        var embed = new Discord.EmbedBuilder()
        .setTitle('ERROR')
        .setDescription('Not a valid command. :(')
        message.reply({ embeds: [embed] })
    }
});

client.login(token);