const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const db = require("orio.db")
const embed = require("../embed.js")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("linklerim")
    .setDescription("Senin eklediğin linkleri gösterir. ")

  ,
  execute(interaction) {
    if (!db.has(`${interaction.member.id}-projects`) || db.get(`${interaction.member.id}-projects`) == 0) {
      interaction.reply({
        embeds: [embed.new(`Sistemde kayıtlı hiçbir linkin yok.\nYeni link eklemek için**\`/link_ekle\`** komudunu kullanabilirsin.`, "#ff0000")],
        ephemeral: true
      })
      return
    }
    const response = new EmbedBuilder()
      .setTitle("Linklerin")
      .setAuthor({ name: `${interaction.member.displayName}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true, size: 64 }) })
      .setFooter({ text: `${interaction.client.user.tag}`, iconURL: interaction.client.user.displayAvatarURL({ dynamic: true, size: 64 }) })
    db.get(`${interaction.member.id}-links`).map(e => { response.addFields({ name: `${e.link.split('/')[2]}`, value: `[Buraya](${e.link}) tıklayarak linki açabilirsin` }) })
    interaction.reply({
      embeds: [response],
      ephemeral: true
    })

  }
}