const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Botun ve Discord API sinin gecikmesini atar.")
  ,
  execute(interaction) {
    interaction.reply({ content: `API gecikmesi ${interaction.client.ws.ping}ms\nBenim gecikmem ${Date.now() - interaction.createdTimestamp}ms` });
  }
}