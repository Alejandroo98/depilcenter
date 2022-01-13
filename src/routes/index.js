const express = require('express');
const router = express.Router(); //Aqui definimos las rutas de nuestro servidor
const app = express();
const path = require('path');
const {
  getDepilacionDefinitiva,
  getDepilacionDefinitivaNavidad,
} = require('../helpers/getDataZonas');

app.set('views', path.resolve(__dirname, '../public/views'));

app.use(require('./main'));

app.use(require('./contacto'));

app.use(require('./cotizar'));

app.use(require('./indicaciones'));

app.use(require('./reservar'));

app.get('/pages', (req, res) => {
  res.render('pages');
});

app.get('/depilacion-definitiva-promocion', (req, res) => {
  // let zonas = getDepilacionDefinitivaNavidad('mujer');
  // const corporal = zonas.filter((zona) => {
  //   return zona.tipo == 'corporal';
  // });

  // const facial = zonas.filter((zona) => {
  //   return zona.tipo == 'facial';
  // });

  // res.render('diciembre', { corporal, facial });

  res.redirect('/');
});

app.get('/wh', (req, res) => {
  console.log('GET - DEPILCENTER');
  res.json({
    msg: 'Seguro este no es el lugar que buscaba, pero encontro el robot de mensajerias Depilcenter',
  });
});

app.post('/wh', (req, res) => {
  const { app, sender, message, group_name, phone } = req.body;

  if (message == 'clave') {
    console.log('ESOS SON LOS DATOS ->', app, sender, message, group_name, phone);
    res.json({ reply: `¡Hola!, responderemos lo antes posible 🏃‍♀️` });
  }

  res.json();
});

app.get('/*', (req, res) => {
  res.redirect('/');
});

module.exports = app;
