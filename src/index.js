//Codigo del servidor
const express = require('express');
const engine = require('ejs-mate');
const path = require('path'); //Sirve para unir directorios o escribir una ruta y que sea multiplataforma
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const hbs = require('hbs');
const { nextTick } = require('process');
const router = require('./routes');
const render = express.Router();
//Inicialicacion
const app = express(); //Ejecuto express y lo gardo en una constante
require('./data-base');
app.set('port', process.env.PORT || 3000);

//Configurarciones
app.use(express.static(path.resolve(__dirname, './public')));
hbs.registerPartials(__dirname + '/partials');
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'public/views'));
// app.engine('hbs', engine); //Aqui lo creamos

//middlewares => Son funciones que se ejecutan antes de que pasen a las rutas

//Routs
app.use(function (req, res, next) {
  app.use(require('./routes/index')(req.url));
  next();
});

//Empezando el servidor
app.listen(app.get('port'), () => {
  console.log('Puerto conectado en ', app.get('port'));
});
