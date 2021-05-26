const express = require('express');
const app = express();
const path = require('path');

app.set('views', path.resolve(__dirname, '../public/views'));

app.get('/contactos', (req, res) => {
  res.render('contactos');
});

module.exports = app;
