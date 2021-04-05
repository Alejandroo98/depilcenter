const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Reserva = require('../models/reserva');
const datosReserva = require('../models/datosReserva');
const { verificarDatos } = require('../middleware/comprovar');
const Recaptcha = require("express-recaptcha").RecaptchaV2;
let recaptcha = new Recaptcha ("6LebnZwaAAAAAIfkMp96C9c5u0o4ZG0_jaILV45_" , "6LebnZwaAAAAANTQZkgqtYgi5myr3dxceR9P2gUo" )

app.use(express.urlencoded({ extended: false }));

app.set('views', path.resolve(__dirname, '../public/views'));

app.post('/', recaptcha.middleware.verify ,async (req, res , next) => {
  let datos = req.body;
  
    // let error = {
    //   errOne: 'LLena todos los campos',
    //   errTwo: 'e intentalo de nuevo',
    // };
    // req.flash('error', error);
    // return res.redirect('/');

   if( req.recaptcha.error ){
    req.flash("recaptcha" , "Por favor marca la recaptcha" )
    return res.redirect('/');
   }
  else{
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
      fechaCumpleanios : req.body.fechaCumpleanios,
      suscrito : req.body.suscripcion
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
    telefono : req.body.numeroCelular,
    servicio: req.body.servicios,
  }

  /* == ¡WARNING!=> ASI ES COMO ENVIAMOS MENSAJES A UN RENDER, TENEMOS QUE HACERLO DIRECTAMENTE, NO PODEMOS CREAR VARIABLES GLOBALES COMO LO HABIAMOS HECHO ANTERIORMENTE DESDE EL ARCHIVO DEL SERVIDOR=== */
   req.flash('exitoreserva' , datosCliente )
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
