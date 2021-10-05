const express = require('express');
const app = express();

const { guardarDatosReserva, guardarDatosUsuario } = require('../helpers/guardarReserva');
const { validaciones } = require('../helpers/validaciones');
const { handleErrors } = require('../middleware/handleErrors');
const { generarJWT } = require('../helpers/jwt');

app.post('/reservar', [validaciones, handleErrors], async (req, res) => {
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
