const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

let loggingEnabled = true;
const logChannelId = '1129191551638175744'; // ID of the log channel

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.on('messageReactionAdd', (reaction, user) => {
  if (!loggingEnabled) return;

  const logChannel = client.channels.cache.get(logChannelId);
  if (!logChannel) return;

  let imageUrl = '';
  if (reaction.message.attachments.size > 0) {
    imageUrl = reaction.message.attachments.first().url;
  }

  const embed = new Discord.MessageEmbed()
    .setDescription(`:white_check_mark: ${user.toString()} **reacted with ${reaction.emoji.toString()}**`)
    .setColor('#00ff00')
    .addField('Message', `[Jump to Message](${reaction.message.url})`)
    .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
    .setImage(imageUrl)
    .setTimestamp()
    .setFooter(`${reaction.message.guild.name}`, reaction.message.guild.iconURL({ dynamic: true }));

  logChannel.send(embed);
});

client.on('messageReactionRemove', (reaction, user) => {
  if (!loggingEnabled) return;

  const logChannel = client.channels.cache.get(logChannelId);
  if (!logChannel) return;

  let imageUrl = '';
  if (reaction.message.attachments.size > 0) {
    imageUrl = reaction.message.attachments.first().url;
  }

  const embed = new Discord.MessageEmbed()
    .setDescription(`:no_entry: ${user.toString()} **removed reaction ${reaction.emoji.toString()}**`)
    .setColor('#ff0000')
    .addField('Message', `[Jump to Message](${reaction.message.url})`)
    .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
    .setImage(imageUrl)
    .setTimestamp()
    .setFooter(`${reaction.message.guild.name}`, reaction.message.guild.iconURL({ dynamic: true }));

  logChannel.send(embed);
});

client.login('.');
