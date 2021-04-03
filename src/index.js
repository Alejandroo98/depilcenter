//Codigo del servidor
const express = require('express');
const engine = require('ejs-mate');
const path = require('path'); //Sirve para unir directorios o escribir una ruta y que sea multiplataforma
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express(); //Ejecuto express y lo gardo en una constante
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');

module.exports.io = socketIo(server);
require('./socket/socket_servidor');

mongoose.set('useCreateIndex', true);
require('./passport/passport-auth');
require('./config/config');

//Inicialicacion
require('./data-base');
// app.set('port', process.env.PORT || 3000);

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Configurarciones
app.use(express.static(path.resolve(__dirname, './public')));
hbs.registerPartials(__dirname + '/partials');
app.set('views', path.resolve(__dirname, 'public/views'));
app.set('view engine', 'hbs');
// app.engine('css', engine); //Aqui lo creamos

app.use(
  session({
    secret: 'estaEsUnaClaveDePrueba',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());

app.use((req, res, next) => {
  app.locals.error = req.flash('error')[0];
  //Para poder enviar mensajes por flash al renderizar una pagina lo hacemos como esta en elarchivo registroReserva, lo tenemos que hacer directamente desde ahi, no hay otra manera.
  next();
});


  // console.log(app.locals.exitoreserva = req.flash('exitoreserva'));
 

//Routs
app.use(require('./routes/registroReserva'));
app.use(function (req, res, next) {
  app.use(require('./routes/index')(req.url));
  next();
});

//DB

//Empezando el servidor
server.listen(process.env.PORT, () => {
  console.log('Puerto conectado en ', process.env.PORT);
});
