const express = require('express');
const app = express();
const path = require('path');
const { guardarDatosReserva, guardarDatosUsuario } = require('../helpers/guardarReserva');
const promoServicios = require('../DB/promos-servicios.json');
const { datosCumpleanieros } = require('../helpers/getCumpleanieros');
const { desestrucutrarReserva } = require('../helpers/desestrucutrarReserva');

app.set('views', path.resolve(__dirname, '../public/views'));

app.get('/', async (req, res) => {
  const cumpleanieros = await datosCumpleanieros();
  res.render('index', { promoServicios, cumpleanieros });
});

app.post('/', async (req, res, next) => {
  const { datosReserva, reserva } = desestrucutrarReserva(req.body);

  const datosOk = guardarDatosUsuario(datosReserva);
  const reservaOk = guardarDatosReserva(reserva);
  if (datosOk && reservaOk) {
    return res.render('succes', { message: { nombre: 'Alejo' } });
  }

  res.redirect('/');
});

module.exports = app;
