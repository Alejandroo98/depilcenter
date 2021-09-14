const { Router } = require('express');
const router = Router();
const { getDepilacionCera, getDepilacionDefinitiva } = require('../helpers/getDataZonas');
const { comprovarQueryGenero } = require('../middleware/queryGenero');

router.get('/cotizar/depilacion-cera', comprovarQueryGenero, (req, res) => {
  let zonas = [];

  const { genero } = req.query;

  if (genero == 'mujer') {
    zonas = getDepilacionCera('mujer');
  } else if (genero == 'hombre') {
    zonas = getDepilacionCera('hombre');
  }

  const corporal = zonas.filter((zona) => {
    return zona.tipo == 'corporal';
  });

  const facial = zonas.filter((zona) => {
    return zona.tipo == 'facial';
  });

  res.render('cotizar', { corporal, facial });
});

router.get('/cotizar/depilacion-definitiva', (req, res) => {
  let zonas = [];

  const { genero } = req.query;

  if (genero == 'mujer') {
    zonas = getDepilacionDefinitiva('mujer');
  } else if (genero == 'hombre') {
    zonas = getDepilacionDefinitiva('hombre');
  }

  const corporal = zonas.filter((zona) => {
    return zona.tipo == 'corporal';
  });

  const facial = zonas.filter((zona) => {
    return zona.tipo == 'facial';
  });

  res.render('cotizar', { corporal, facial });
});

module.exports = router;
