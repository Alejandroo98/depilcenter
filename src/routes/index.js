const express = require('express');
const router = express.Router(); //Aqui definimos las rutas de nuestro servidor
const app = express();
const path = require('path');
app.set('views', path.resolve(__dirname, '../public/views'));

app.use( function( req , res , next ) {
  const routes = [
    '/',
    '/cotizar-combos/hombre',
    '/cotizar-combos/mujer',
    '/cotizar-combos/combos',
    '/blog',
    '/conocenos',
    '/contactos',
  ];

  let comrpovarRuta = routes.includes(req.url);
  if (!comrpovarRuta) {
    
    app.get( req.url , ( req , res ) => {
      res.redirect('/');
    });
    
  }else{

    app.use(require("./main"))
    app.use(require("./contacto"))
    app.use(require("./cotizar"))
    app.use(require("./conocenos"))
    
    //A esta ruta no le cree un archivo independiente como los de arriba por que no desde blog no se envia ningun formulario
    app.get("/blog" , ( req , res ) => {
      res.render("blog")
    })

  }

  next()

});



module.exports = app;