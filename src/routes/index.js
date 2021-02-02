const express = require('express');
const router = express.Router(); //Aqui definimos las rutas de nuestro servidor
const app = express();

module.exports = function (url) {
  const routes = [
    '/',
    '/cotizar-combos',
    '/cotizar-combos/hombre',
    '/blog',
    '/ubicacion',
    '/servicios',
    '/contactos',
  ];

  let comrpovarRuta = routes.includes(url);
  let urlCut = url.substr(1, url.length - 1);

  if (url === '/cotizar-combos/hombre') {
    return router.get(url, (req, res, next) => {
      res.render('cotizar-combos');
    });
  }

  if (comrpovarRuta) {
    return router.get(url, (req, res, next) => {
      res.render(urlCut);
    });
  }
  return router.get(url, (req, res, next) => {
    res.redirect('/');
  });
};
