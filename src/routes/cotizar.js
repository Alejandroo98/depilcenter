const { Router } = require('express');
const { filterServicios } = require('../helpers/filtros');
const router = Router();

const {
  getDepilacionCera,
  getDepilacionDefinitiva,
  getInfo_d_Cera,
  getInfo_d_Definitiva,
} = require('../helpers/getDataZonas');

const { comprovarQueryGenero } = require('../middleware/queryGenero');
const ultimasPromociones = require('../DB/ultimas-promociones.json');
const servicios = filterServicios('selectForm', true);
const indicacionesIPL = require('../DB/indicaciones.json');

router.get('/cotizar', (req, res) => {
  res.redirect('/cotizar/depilacion-cera?genero=mujer');
});

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

  const url = req.url;
  const _info_d_cera = getInfo_d_Cera();

  res.render('cotizar', {
    corporal,
    facial,
    otrosServicios,
    ultimasPromociones,
    servicios,
    url,
    _info_d_cera,
  });
});

router.get('/cotizar/depilacion-definitiva', comprovarQueryGenero, (req, res) => {
  const servicio = indicacionesIPL[0].d_definitiva.indicaciones;

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

  const url = req.url;
  const _info_d_definitiva = getInfo_d_Definitiva();
  res.render('cotizar', {
    corporal,
    facial,
    otrosServicios,
    ultimasPromociones,
    servicios,
    url,
    servicio,
    _info_d_definitiva,
  });
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
