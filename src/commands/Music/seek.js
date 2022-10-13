const { EmbedBuilder } = require("discord.js");
const { convertTime } = require('../../utils/convert.js')
const ms = require('ms');

function hmsToMiliseconds(str) {
    var p = str.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }
    return s*1000;
}

module.exports = {
  	name: "seek",
  	aliases: [],
  	category: "Music",
  	description: "Seek the currently playing song.",
    args: false,
    usage: "<10s || 10m || 10h || HH:mm:ss || mm:ss>",
    userPerms: [],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
 execute: async (message, args, client, prefix) => {
  
		const player = client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor("Red")
                .setDescription("There is no music playing.");
            return message.reply({embeds: [thing]});
        }

        let time = interaction.options.getString("time");
        time.includes(":") || Number.isInteger(time) ? time = hmsToMiliseconds(time) : time = ms(time);
        const position = player.position;
        const duration = player.queue.current.duration;

        const emojiforward = client.emoji.forward;
        const emojirewind = client.emoji.rewind;

        const song = player.queue.current;
        
        if (time <= duration) {
            if (time > position) {
                player.seek(time);
                let thing = new EmbedBuilder()
                    .setDescription(`${emojiforward} **Forward**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                    .setColor(client.embedColor)
                    .setTimestamp()
                return message.reply({embeds: [thing]});
            } else {
                player.seek(time);
                let thing = new EmbedBuilder()
                    .setDescription(`${emojirewind} **Rewind**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                    .setColor(client.embedColor)
                    .setTimestamp()
          return message.reply({embeds: [thing]});
            }
        } else {
            let thing = new EmbedBuilder()
                .setColor("Red")
                .setDescription(`Seek duration exceeds song duration.\nRequested: \`${convertTime(time)}\`\nSong duration: \`${convertTime(duration)}\``);
            return message.reply({embeds: [thing]});
        }
	
    }
};
