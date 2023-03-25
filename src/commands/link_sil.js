const { SlashCommandBuilder } = require("discord.js")
const embed = require("../embed.js")
const db = require("orio.db")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("link_sil")
    .setDescription("Uptime için link siler.")
    .addStringOption(option =>
      option.setName("url")
        .setDescription("Uptime urlsini giriniz")
        .setRequired(true))
  ,
  execute(interaction) {
    const url = interaction.options.getString("url").toLowerCase()
    if (!db.has(`${interaction.member.id}-projects`) || db.get(`${interaction.member.id}-projects`) == 0) {
      interaction.reply({
        embeds: [embed.new(`Sistemde kayıtlı hiçbir linkin yok.\nYeni link eklemek için**\`/link_ekle\`** komudunu kullanabilirsin.`, "#ff0000")],
        ephemeral: true
      })
      return
    }
    if (!url.startsWith("http") || !url.includes("://")) {
      interaction.reply({
        embeds: [embed.new(`Vermiş olduğunuz \`${url}\` geçerli bir url değil gibi görünüyor.`, "#ff0000")],
        ephemeral: true
      })
      return
    }
    var vbool = false
    db.get(`${interaction.member.id}-links`).forEach(element => {
      if (element.link == url) {
        vbool = true

      }
    })
    if (vbool) {
      db.unpush(`${interaction.member.id}-links`, { link: url })
      db.substract(`${interaction.member.id}-projects`, 1)

      if (db.get(`${interaction.member.id}-projects`) == 0) db.delete(`${interaction.member.id}-projects`)


      interaction.reply({
        embeds: [embed.new(`Vermiş olduğunuz \`${url}\`  başarıyla sistemden kaldırıldı`, "#00ff00")],
        ephemeral: true
      })
      if (db.get(`${interaction.member.id}-projects`) == 0) {
        db.delete(`${interaction.member.id}-projects`)
      }
    } else {
      interaction.reply({
        embeds: [embed.new(`Vermiş olduğunuz \`${url}\` sistemde zaten bulunmuyor`)],
        ephemeral: true
      })
    }
  }
}