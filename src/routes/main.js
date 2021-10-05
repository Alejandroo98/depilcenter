const express = require('express');
const app = express();
const path = require('path');
const { datosCumpleanieros } = require('../helpers/getCumpleanieros');
const { validarJWT } = require('../middleware/validarJWT');
const { filterServicios } = require('../helpers/filtros');
const ultimasPromociones = require('../DB/ultimas-promociones.json');
const cors = require('cors');

app.set('views', path.resolve(__dirname, '../public/views'));

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // For legacy browser support
};

app.get('/', cors(corsOptions), async (req, res) => {
  const promoServicios = filterServicios('header', true);
  const servicios = filterServicios('selectForm', true);

  const url = req.url;

  const cumpleanieros = await datosCumpleanieros();
  res.render('index', { promoServicios, cumpleanieros, servicios, ultimasPromociones, url });
});

app.get('/success', validarJWT, (req, res) => {
  const { reservaData } = req.datosReserva;

  res.render('succes', { reservaData });
});

module.exports = app;
