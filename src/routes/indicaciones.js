const express = require('express');
const app = express();
const path = require('path');
app.set('views', path.resolve(__dirname, '../public/views'));

app.get('/indicaciones', (req, res) => {
  res.render('indicaciones');
});

module.exports = app;
