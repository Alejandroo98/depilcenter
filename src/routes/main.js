const express = require('express');
const app = express();
const path = require('path');
const { guardarDatosReserva, guardarDatosUsuario } = require('../helpers/guardarReserva');
const { datosCumpleanieros } = require('../helpers/getCumpleanieros');
const servicios = require('../DB/servicios.json');
const { validaciones } = require('../helpers/validaciones');
const { handleErrors } = require('../middleware/handleErrors');
const { generarJWT } = require('../helpers/jwt');
const { validarJWT } = require('../middleware/validarJWT');
const { filterServicios } = require('../helpers/filtros');

app.set('views', path.resolve(__dirname, '../public/views'));

app.get('/', async (req, res) => {
  const promoServicios = filterServicios('header', true);
  const servicios = filterServicios('selectForm', true);

  const cumpleanieros = await datosCumpleanieros();
  res.render('index', { promoServicios, cumpleanieros, servicios });
});

app.get('/success', validarJWT, (req, res) => {
  const { reservaData } = req.datosReserva;

  res.render('succes', { reservaData });
});

app.post('/', [validaciones, handleErrors], async (req, res) => {
  const datosReserva = req.datosReserva;
  const reserva = req.reserva;

  try {
    guardarDatosUsuario(datosReserva);
    guardarDatosReserva(reserva);
    const token = await generarJWT({ ...datosReserva, ...reserva });
    return res.redirect(`/success?token=${token}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = app;
