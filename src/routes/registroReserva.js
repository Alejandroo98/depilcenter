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

app.post('/', async (req, res, next) => {
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
  } else {
    let horaActual = new Date();
    let guardarHora = `${horaActual.getHours()}:${horaActual.getMinutes()}`;
    let guardarFecha = `${horaActual.getDate()}-${
      horaActual.getMonth() + 1
    }-${horaActual.getUTCFullYear()}`;
    let dateDB = `${guardarFecha} / ${guardarHora}`;

    datosReservaDB = new datosReserva({
      nombres: req.body.nombres,
      email: req.body.email,
      numeroTelefono: req.body.numeroCelular,
      fechaRegistro: dateDB,
    });

    await datosReservaDB.save();

    datosReserva.findOne({ email: req.body.email }, (err, emailUser) => {
      let reserva = new Reserva({
        idUser: emailUser.id,
        local: req.body.locales,
        servicio: req.body.servicios,
        hora: req.body.hora,
        fecha: req.body.fecha,
        fechaRegistro: dateDB,
      });

      reserva.save();
    });

    res.send('DATOS GUARDADOS');
  }

  next();
});

app.post('/cotizar-combos/combos', (req, res) => {
  datos = JSON.parse(JSON.stringify(req.body));
  console.log(datos);
  // res.send(`<h1>Alejo</h1>`);
});

module.exports = app;
