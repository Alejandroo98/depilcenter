const { Router } = require('express');
const { filterServicios } = require('../helpers/filtros');
const router = Router();
const { getDepilacionCera, getDepilacionDefinitiva } = require('../helpers/getDataZonas');
const { comprovarQueryGenero } = require('../middleware/queryGenero');

router.get('/cotizar/depilacion-cera', comprovarQueryGenero, (req, res) => {
  let zonas = [];

  const otrosServicios = filterServicios('otroServicio', true);

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

  res.render('cotizar', { corporal, facial, otrosServicios });
});

router.get('/cotizar/depilacion-definitiva', (req, res) => {
  let zonas = [];

  const otrosServicios = filterServicios('otroServicio', true);

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

  res.render('cotizar', { corporal, facial, otrosServicios });
});

router.post('/getPreciosCombos', (req, res) => {
  const { id, path, query } = req.body;
  let zonas = [];

  if (path.split('/')[2] == 'depilacion-cera') {
    if (query == 'mujer') {
      zonas = getDepilacionCera('mujer').filter((zona) => {
        return zona.id != id;
      });
    } else if (query == 'hombre') {
      zonas = getDepilacionCera('hombre').filter((zona) => {
        return zona.id != id;
      });
    }
  } else if (path.split('/')[2] == 'depilacion-definitiva') {
    if (query == 'mujer') {
      zonas = getDepilacionDefinitiva('mujer').filter((zona) => {
        return zona.id != id;
      });
    } else if (query == 'hombre') {
      zonas = getDepilacionDefinitiva('hombre').filter((zona) => {
        return zona.id != id;
      });
    }
  }

  res.json({ zonas });
});

module.exports = router;
