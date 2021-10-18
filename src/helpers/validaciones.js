const { check } = require('express-validator');
const serviciosJson = require('../DB/servicios.json');

const haveNumber = (nombres) => {
  let numeros = '0123456789';
  for (let i = 0; i < nombres.length; i++) {
    if (numeros.indexOf(nombres.charAt(i), 0) != -1) {
      return false;
    }
  }
  return true;
};

const correctNumber = (telefono) => {
  const check = telefono.toString().slice(0, 3);
  if (check == '098' || check == '099') {
    return true;
  }
  return false;
};

const horarios = [
  '09:00_AM',
  '10:00_AM',
  '11:00_AM',
  '12:00_AM',
  '01:00_PM',
  '02:00_PM',
  '03:00_PM',
  '04:00_PM',
  '05:00_PM',
  '06:00_PM',
];

const serviciosObject = () => {
  let servicios = [];
  serviciosJson.forEach((servicio) => {
    servicios = [...servicios, servicio.id];
  });
  return servicios;
};

const validaciones = [
  check('nombres')
    .not()
    .isEmpty()
    .withMessage('Ingrese sus nombres eh intente de nuevo.')
    .not()
    .isNumeric()
    .custom(haveNumber)
    .withMessage('Ingrese nombres validos')
    .isLength({ min: 4 })
    .withMessage('Sus nombres son muy cortos, intente de nuevo')
    .isLength({ max: 30 })
    .withMessage('Sus nombres son muy largos, intente de nuevo'),
  check('numeroTelefono')
    .not()
    .isEmpty()
    .withMessage('Ingrese su telefono, eh intente de nuevo')
    .isLength({ min: 10, max: 10 })
    .withMessage('El numero de telefono debe tener 10 numeros')
    .isNumeric()
    .withMessage('Ingrese un numero de telefono valido')
    .custom(correctNumber)
    .withMessage('Ingrese un numero de telefono valido'),
  check('locales', 'Servicio no encontrado, intente de nuevo').not().isEmpty(),
  check('servicio', 'Ingrese un servicio valido.').not().isEmpty().isIn(serviciosObject()),
  check('hora', 'Hora no encontrada, intente de nuevo').not().isEmpty().isIn(horarios),
  check('fecha', 'Ingrese un fecha eh intenta de nuevo').not().isEmpty(),
];

module.exports = { validaciones };
