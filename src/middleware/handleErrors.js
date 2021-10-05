const { validationResult } = require('express-validator');
const { desestrucutrarReserva } = require('../helpers/desestrucutrarReserva');
const redirectView = require('../helpers/redirectView');

const handleErrors = (req, res, next) => {
  const { datosReserva, reserva } = desestrucutrarReserva(req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const { numeroTelefono, ...datosRestantes } = reserva;
    const error = [
      {
        ...datosReserva,
        ...datosRestantes,
        msg: errors.array()[0].msg,
      },
    ];

    console.log(error);

    const { servicio, hora } = reserva;
    const redirect = redirectView(datosRestantes.url, servicio, hora);

    req.flash('error', error);
    console.log(redirect);
    return res.redirect(redirect);
  }

  req.datosReserva = datosReserva;
  req.reserva = reserva;

  next();
};

module.exports = { handleErrors };
