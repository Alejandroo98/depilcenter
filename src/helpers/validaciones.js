const { check } = require('express-validator');

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

const servicios = ['d_cera', 'd_laser', 'l_facial', 'm_relajantes', 't_acne', 'gluteos'];

const validaciones = [
  check('nombres')
    .not()
    .isEmpty()
    .withMessage('El campo "nombres" es obligatorio')
    .not()
    .isNumeric()
    .custom(haveNumber)
    .withMessage('Ingresa nombres validos')
    .isLength({ min: 4 })
    .withMessage('Tus nombres son muy cortos, inenta de nuevo')
    .isLength({ max: 30 })
    .withMessage('Tus nombres son muy largos, inenta de nuevo'),
  check('numeroTelefono')
    .not()
    .isEmpty()
    .withMessage('El campo "telefono" es obligatorio')
    .isLength({ min: 10, max: 10 })
    .withMessage('El numero de telefono debe tener 10 numeros')
    .isNumeric()
    .withMessage('Ingresa un numero de telfono valido')
    .custom(correctNumber)
    .withMessage('Ingresa un numero de telfono valido'),
  check('locales', 'Servicio no encontrado, intenta de nuevo').not().isEmpty(),
  check('servicio', 'Ingresa un nombre eh intenta de nuevo').not().isEmpty().isIn(servicios),
  check('hora', 'Hora no encontrada, intenta de nuevo').not().isEmpty().isIn(horarios),
  check('fecha', 'Ingresa un nombre eh intenta de nuevo').not().isEmpty(),
];

module.exports = { validaciones };
