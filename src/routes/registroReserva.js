const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Reserva = require('../models/reserva');
const datosReserva = require('../models/datosReserva');

app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.resolve(__dirname, '../public/views'));

app.post('/', function (req, res) {
  res.send({
    res: req.body.hora,
  });

  //   res.render('index');
});

module.exports = app;
