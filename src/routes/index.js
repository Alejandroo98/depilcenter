const express = require('express');
const router = express.Router(); //Aqui definimos las rutas de nuestro servidor
const app = express();
const path = require('path');
app.set('views', path.resolve(__dirname, '../public/views'));

app.use(require('./main'));

app.use(require('./contacto'));

app.use(require('./cotizar'));

app.use(require('./conocenos'));

app.use('/admin', require('./admin'));

app.get('/blog', (req, res) => {
  res.render('blog');
});

app.get('/*', (req, res) => {
  res.redirect('/');
});

module.exports = app;
