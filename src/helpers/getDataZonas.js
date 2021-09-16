const depilacionCera = require('../DB/depilacion-cera.json');
const depilacionDefinitiva = require('../DB/depilacion-definitiva.json');
const otrosServicios = require('../DB/otros-servicios.json');

const getDepilacionCera = (genero) => {
  if (genero == 'mujer') {
    return depilacionCera[0].mujer;
  } else if (genero == 'hombre') {
    return depilacionCera[0].hombre;
  }
};

const getDepilacionDefinitiva = (genero) => {
  if (genero == 'mujer') {
    return depilacionDefinitiva[0].mujer;
  } else if (genero == 'hombre') {
    return depilacionDefinitiva[0].hombre;
  }
};

const getOtrosServicios = () => {
  return otrosServicios;
};

module.exports = { getDepilacionCera, getDepilacionDefinitiva, getOtrosServicios };
