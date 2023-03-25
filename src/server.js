const express = require('express');
const server = express();


server.all(`/`, (req, res) => {
    res.send(`Durum:[Tmm]`);
});

function keepAlive() {
  var msg =""
    server.listen(3000, () => {
    console.log(`Sunucu artık aktif `)
    })
  return msg
}

module.exports = keepAlive;