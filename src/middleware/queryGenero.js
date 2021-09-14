const { response, request } = require('express');

const comprovarQueryGenero = (req = request, res = response, next) => {
  const { genero } = req.query;
  console.log(genero);

  if (genero == 'hombre' || genero == 'mujer') {
    return next();
  }
  return res.redirect('/');
};

module.exports = { comprovarQueryGenero };
