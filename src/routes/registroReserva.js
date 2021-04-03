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
  )
   {
    let error = {
      errOne: 'LLena todos los campos',
      errTwo: 'e intentalo de nuevo',
    };
    req.flash('error', error);
    return res.redirect('/');
  } 
  else 
  {
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
      // console.log(datosCliente);
      reserva.save();
    });
  }
  let datosCliente = {
    nombre :  req.body.nombres,
    local : req.body.locales,
    hora: req.body.hora,
    fecha: req.body.fecha,
  }

  /* == ¡WARNING!=> ASI ES COMO ENVIAMOS MENSAJES A UN RENDER, TENEMOS QUE HACERLO DIRECTAMENTE, NO PODEMOS CREAR VARIABLES GLOBALES COMO LO HABIAMOS HECHO ANTERIORMENTE DESDE EL ARCHIVO DEL SERVIDOR=== */
   req.flash('exitoreserva' , datosCliente)
   res.render("succes" , { message : req.flash('exitoreserva')[0] });
  
});

app.post('/cotizar-combos/combos', (req, res) => {
  datos = JSON.stringify(req.body);
  res.render("succes")

  console.log(datos);
  // console.log(datos);
  // res.send(`<h1>Alejo</h1>`);
});

module.exports = app;
