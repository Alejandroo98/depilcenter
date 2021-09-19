const express = require('express');
const app = express();
const path = require('path');
const { guardarDatosReserva, guardarDatosUsuario } = require('../helpers/guardarReserva');
const promoServicios = require('../DB/promos-servicios.json');

// const Reserva = require('../models/reserva');
// const DatosReserva = require('../models/datosReserva');

app.use(express.urlencoded({ extended: false }));
app.set('views', path.resolve(__dirname, '../public/views'));

app.get('/', (req, res) => {
  res.render('index', { promoServicios });
});

app.post('/', async (req, res, next) => {
  const date = new Date();
  const {
    locales,
    servicio,
    hora,
    nombres,
    numeroCelular: celular,
    suscripcion,
    cumpleanios,
    fecha,
  } = req.body;
  const fechaRegistro = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}`;
  // console.log(locales, servicios, hora, nombres, celular, suscripcion, cumpleanios);

  const { ok: Ok, user: User } = guardarDatosUsuario(
    nombres,
    celular,
    fechaRegistro,
    cumpleanios,
    suscripcion
  );
  const { ok, user } = guardarDatosReserva(celular, locales, servicio, hora, fecha);

  if (ok && Ok) {
    return res.render('succes', { message: { nombre: 'Alejo' } });
  }

  return res.redirect('back');
});

module.exports = app;
