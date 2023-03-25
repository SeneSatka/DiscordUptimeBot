const { EmbedBuilder } = require("discord.js")
class embed {
  constructor() { }
  new(description, color = "#f0f0f0", title = null) {
    const embed = new EmbedBuilder()
      .setTitle(title)
      .setColor(color)
      .setDescription(description)
    return embed;
  }
}
module.exports = new embed()