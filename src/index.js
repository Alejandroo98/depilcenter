//Codigo del servidor
const express = require('express');
const engine = require('ejs-mate');
const path = require('path'); //Sirve para unir directorios o escribir una ruta y que sea multiplataforma
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.set('useCreateIndex', true);
require('./config/config');

//Inicialicacion
const app = express(); //Ejecuto express y lo gardo en una constante
require('./data-base');
// app.set('port', process.env.PORT || 3000);

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Configurarciones
app.use(express.static(path.resolve(__dirname, './public')));
hbs.registerPartials(__dirname + '/partials');
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'public/views'));
app.engine('css', engine); //Aqui lo creamos
app.use(require('./routes/registroReserva'));

//Routs
app.use(function (req, res, next) {
  app.use(require('./routes/index')(req.url));
  next();
});

//DB

//Empezando el servidor
app.listen(process.env.PORT, () => {
  console.log('Puerto conectado en ', process.env.PORT);
});
