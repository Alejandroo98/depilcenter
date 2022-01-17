const express = require('express');
const app = express();
const { saludo, palabraClave } = require('../helpers/chatBotHelpers');

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
  if (id != 8080) return res.json({ reply: 'INGRESA EL ID' });

  if (message == 'pepe') {
    return res.json({
      reply: `PAGO AL CONTADO
      Zona: Axilas
      Nro sesiones: 8
      Precio normal: $160
      Precio al contado ( 40% OFF ): $96
      
      PAGO LUEGO DE CADA SESIÓN
      Zona: Axilas
      Precio normal por sesión: $20
      Precio actual por sesión( 20% OFF ): $15.90`,
    });
  } else {
    return res.json({
      reply: `Mil disculpas, las zonas ingresadas no fueron encontradas, por favor intente de nuevo. Recuerde separar la zonas por una coma. \n *0️⃣ MENU PRINCIPAL*`,
    });
  }

  res.json({ reply: '' });
});

module.exports = app;
