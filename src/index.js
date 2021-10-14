//Codigo del servidor
const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const ProgressBar = require('progressbar.js');

module.exports.io = socketIo(server);
require('./socket/socket_servidor');

mongoose.set('useCreateIndex', true);
require('./passport/passport-auth');
require('./config/config');

// parse application/json
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

//Configurarciones
app.use(express.static(path.resolve(__dirname, './public')));
hbs.registerPartials(__dirname + '/partials');
hbs.registerHelper(require('./lib/handlebars'));

app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'public/views'));

app.use(
  session({
    secret: 'estaEsUnaClaveDePrueba',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.error = req.flash('error')[0];
  res.locals.recaptcha = req.flash('recaptcha')[0];
  res.locals.registroError = req.flash('registroError');
  res.locals.registroOk = req.flash('registroOk');
  next();
});

//Routs
app.use(require('./routes/index'));

//DB
mongoose.connect(
  process.env.URLDB,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, res) => {
    if (err) throw err;
    console.log('Data base is alive in port ', process.env.URLDB);
  }
);

//Empezando el servidor
server.listen(process.env.PORT, () => {
  console.log('Puerto conectado en ', process.env.PORT);
});
