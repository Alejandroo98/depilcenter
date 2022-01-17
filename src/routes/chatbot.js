const express = require('express');
const app = express();
const zonas = require('../DB/chat-bot-zonas.json');
const { validarZonas, comprovarZonas } = require('../helpers/chatBotHelpers');

app.get('/wh', (req, res) => {
  console.log('GET - DEPILCENTER');
  res.json({
    msg: 'Hola, te saluda el charBot de Depilcenter - Centro de depilacion',
  });
});

app.post('/wh', (req, res) => {
  //EL BOT SOTO DEBE RESPONDER CUANDO LE ENVIAN ALGUN NUMERO, SI NO LE ENVIAN ALGO DISTINO ENTONCES RESPONDES UN MENSAJE DE ESPERA

  const { app, sender, message, group_name, phone } = req.body;

  console.log({ app, sender, message, group_name, phone });

  const { id } = req.headers;
  if (id != 8080) return res.json({ reply: 'INGRESA EL ID' });

  if (!validarZonas(message)) {
    //TODO: en el if, lo que haras es ver si existe una zona entre el texto, si no existe entocnes unicamente dale indicaciones
    return res.json({
      reply: `Por favor, ingresa la zona. Si es mas de una separala con una coma. Ej. axilas,bikini,media pierna,etc`,
    });
  } else {
    //TODO: En el fin primera mira si el formato enviado es correcto, y si las zonas existen antes de pasar a lo siguiente

    const validZonas = comprovarZonas(message);

    if (validZonas) {
      //TODO: Limpia el nombre de las zonas antes de pasar a buscarlo
      //TODO: Busca las zonas y enivalas al cient

      return res.json({
        ok: true,
        reply: validZonas,
      });
    } else {
      return res.json({
        reply: `Mil disculpas, las zonas ingresadas no fueron encontradas, por favor intente de nuevo. Recuerde separar la zonas por una coma. \n *0️⃣ MENU PRINCIPAL*`,
      });
    }
  }

  res.json({ reply: '' });
});

module.exports = app;
