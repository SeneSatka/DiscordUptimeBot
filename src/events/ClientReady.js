const { Events, Client } = require('discord.js');
const db = require("orio.db")
const fetch = require("node-fetch");
module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(c) {
    console.log(c.user.username + " uptime etmeye hazır")
    setInterval(() => {
      db.all().map(m => {

        if (m.ID.endsWith("-links")) {
          m.data.forEach(async element => {
            try {
              await fetch(element.link)
            } catch (e) {

            }
          })
        }
      })

    }, 1000 * 60 * 2)
  }, 
};