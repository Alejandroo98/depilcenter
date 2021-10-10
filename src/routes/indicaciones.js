const express = require('express');
const app = express();
const path = require('path');
const { getIndicaciones } = require('../helpers/getIndicaciones');
app.set('views', path.resolve(__dirname, '../public/views'));

app.get('/indicaciones', (req, res) => {
  const query = req.query.servicio;
  const servicios = getIndicaciones(query);
  const items = getIndicaciones('');
  res.render('indicaciones', { servicios, items });
});

module.exports = app;
