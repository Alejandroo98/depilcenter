const express = require('express');
const router = express.Router(); //Aqui definimos las rutas de nuestro servidor
const app = express();

module.exports = function (url) {
  const routes = [
    '/',
    '/cotizar-combos/hombre',
    '/cotizar-combos/mujer',
    '/cotizar-combos/combos',
    '/blog',
    '/conocenos',
    '/contactos',
  ];

  let comrpovarRuta = routes.includes(url);
  let urlCut = url.substr(1, url.length - 1);

  if (
    urlCut === 'cotizar-combos/hombre' ||
    urlCut === 'cotizar-combos/mujer' ||
    urlCut === 'cotizar-combos/combos'
  ) {
  return router.get(url, (req, res) => {
      res.render('cotizar-combos');
    });
  }

  if (comrpovarRuta) {
  return router.get(url, (req, res) => {
      res.render(urlCut);
    });
  }else{
  return  router.get(url, (req, res) => {
     res.redirect('/');
   });
  }

  
};

