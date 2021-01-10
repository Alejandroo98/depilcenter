const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Reserva = require('../models/reserva');
const datosReserva = require('../models/datosReserva');
const { verificarDatos } = require('../middleware/comprovar');
const passport = require('passport');
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.resolve(__dirname, '../public/views'));

app.post('/', (req, res, next) => {
  let datos = req.body;
  if (
    datos.nombres === '' ||
    datos.email === '' ||
    datos.numeroCelular === ''
  ) {
    let error = {
      errOne: 'LLena todos los campos',
      errTwo: 'e intentalo de nuevo',
    };
    req.flash('error', error);
    return res.redirect('/');
  }

  next();
});

module.exports = app;
