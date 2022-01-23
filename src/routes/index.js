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

app.use(require('./chatbot'));

app.use(require('./registroFormulario'));

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

app.get('/*', (req, res) => {
  res.redirect('/');
});

module.exports = app;
