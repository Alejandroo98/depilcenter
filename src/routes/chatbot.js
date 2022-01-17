const express = require('express');
const app = express();
const zonas = require('../DB/chat-bot-zonas.json');
const { comprovarZonas } = require('../helpers/chatBotHelpers');

app.get('/wh', (req, res) => {
  console.log('GET - DEPILCENTER');
  res.json({
    msg: 'Hola, te saluda el charBot de Depilcenter - Centro de depilacion',
  });
});

app.post('/wh', (req, res) => {
  //EL BOT SOTO DEBE RESPONDER CUANDO LE ENVIAN ALGUN NUMERO, SI NO LE ENVIAN ALGO DISTINO ENTONCES RESPONDES UN MENSAJE DE ESPERA

  const { app, sender, message, group_name, phone } = req.body;

  return res.json({
    reply: '',
  });
});

module.exports = app;
