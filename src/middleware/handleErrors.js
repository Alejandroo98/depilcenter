const { validationResult } = require('express-validator');
const { desestrucutrarReserva } = require('../helpers/desestrucutrarReserva');

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

    req.flash('error', error);
    return res.redirect(`/?errors=true&&servicio=${servicio}&&hora=${hora}`);
  }

  req.datosReserva = datosReserva;
  req.reserva = reserva;

  next();
};

module.exports = { handleErrors };
