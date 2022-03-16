const depilacionCera = require('../DB/depilacion-cera.json');
const depilacionDefinitiva = require('../DB/depilacion-definitiva.json');

const getDepilacionCera = (genero) => {
  if (genero == 'mujer') {
    return depilacionCera[0].mujer;
  } else if (genero == 'hombre') {
    return depilacionCera[0].hombre;
  }
};

const getDepilacionDefinitivaNavidad = (genero) => {
  if (genero == 'mujer') {
    return depilacionDefinitiva[0].mujer;
  } else if (genero == 'hombre') {
    return depilacionDefinitiva[0].hombre;
  }
};

const getDepilacionDefinitiva = (genero) => {
  if (genero == 'mujer') {
    return depilacionDefinitiva[0].mujer;
  } else if (genero == 'hombre') {
    return depilacionDefinitiva[0].hombre;
  }
};

const getInfo_d_Cera = () => {
  return depilacionCera[0]._info;
};

const getInfo_d_Definitiva = () => {
  return depilacionDefinitiva[0]._info;
};

module.exports = {
  getDepilacionCera,
  getDepilacionDefinitiva,
  getInfo_d_Cera,
  getInfo_d_Definitiva,
  getDepilacionDefinitivaNavidad,
};
