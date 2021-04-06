const express = require("express");
const { model } = require("../models/datosReserva");
const app = express()
const path = require('path');
app.set('views', path.resolve(__dirname, '../public/views'));



app.get("/cotizar-combos/mujer" , ( req , res ) => {
    res.render("cotizar-combos")
});

app.get("/cotizar-combos/hombre" , ( req , res ) => {
    res.render("cotizar-combos")
});

app.get("/cotizar-combos/combos" , ( req , res ) => {
    res.render("cotizar-combos")
    console.log(req.url);
});


app.post('/cotizar-combos/combos', (req, res) => {
    datos = JSON.stringify(req.body);
    res.render("succes")
  
    console.log(datos);
    // console.log(datos);
    // res.send(`<h1>Alejo</h1>`);
  });

  module.exports = app;
  