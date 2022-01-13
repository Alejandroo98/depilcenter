const express = require('express');
const app = express();
const chatBotsJson = require('../DB/chat-bot.json');
const { saludo } = require('../helpers/chatBotHelpers');

app.get('/wh', (req, res) => {
  console.log('GET - DEPILCENTER');
  res.json({
    msg: 'Hola, te saluda el charBot de Depilcenter - Centro de depilacion',
  });
});

app.post('/wh', (req, res) => {
  //EL BOT SOTO DEBE RESPONDER CUANDO LE ENVIAN ALGUN NUMERO, SI NO LE ENVIAN ALGO DISTINO ENTONCES RESPONDES UN MENSAJE DE ESPERA

  const { app, sender, message, group_name, phone } = req.body;
  // const nombreRegistradoCliente = 'Jefferson Alava';
  const nombreRegistradoCliente = sender;
  console.log({ app, sender, message, group_name, phone });
  // const coincidenciasSaludo = chatBotsJson[0].saludo.coincidencias;
  // const resultadoCoincidenciaSaludo = coincidenciasSaludo.indexOf('papas'); //Si el resultado es -1 significa que no existe

  const { id } = req.headers;
  if (id != 8080) res.json({});

  if (message == 'clave') {
    // all: `Message: ${message} - Phone: ${phone} - Sender: ${sender}`,
    return res.json({
      reply: `${saludo(nombreRegistradoCliente)}`,
    });
  }

  res.json();
});

module.exports = app;
