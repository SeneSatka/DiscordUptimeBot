const { SlashCommandBuilder } = require("discord.js")
const embed = require("../embed.js")
const db = require("orio.db")
const fetch = require("node-fetch")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("link_ekle")
    .setDescription("Uptime için link ekler.")
    .addStringOption(option =>
      option.setName("url")
        .setDescription("Uptime urlsini giriniz")
        .setRequired(true))
  ,
  async execute(interaction) {
    const url = interaction.options.getString("url").toLowerCase()

    if (!url.startsWith("https://")) {
      await interaction.reply({
        embeds: [embed.new(`Vermiş olduğunuz \`${url}\` geçerli bir url değil gibi görünüyor.`, "#ff0000")],
        ephemeral: true
      })
      return
    }
    var linkss;
    async function link(link) {


    }

    try {
      await fetch(url)
      if (!db.has(`${interaction.member.id}-projects` || db.get(`${interaction.member.id}-projects`) == 0)) {
        db.set(`${interaction.member.id}-projects`, 0)
        db.set(`${interaction.member.id}-links`, [])
        db.push(`${interaction.member.id}-links`, { link: url })
        db.add(`${interaction.member.id}-projects`, 1)


      } else {
        var vbool = false
        db.get(`${interaction.member.id}-links`).forEach(element => {
          if (element.link == url) {
            vbool = true

          }
        })
        if (vbool) {
          interaction.reply({
            embeds: [embed.new(`Vermiş olduğunuz \`${url}\` linki sistemde zaten kayıtlı. \nYeni link eklemek için**\`/link_ekle\`** komudunu kullanabilirsin.`, "#ff0000")],
            ephemeral: true
          })
          return;
        } else {
          db.push(`${interaction.member.id}-links`, { link: url })
          db.add(`${interaction.member.id}-projects`, 1)
        }

      }
      interaction.reply({
        embeds: [embed.new(`Vermiş olduğunuz \`${url}\` linki başarıyla sisteme kaydedildi. \nLinklerinize bakmak için **\`/linklerim\`** komudunu kullanınız`, "#00FF00")],
        ephemeral: true
      })


    } catch (err) {
      await interaction.reply({
        embeds: [embed.new(`Vermiş olduğunuz \`${url}\` geçerli bir url değil gibi görünüyor.`, "#ff0000")],
        ephemeral: true
      })

    }

  }
}