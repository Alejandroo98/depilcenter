const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return res.redirect('/');
  }

  try {
    const datosReserva = jwt.verify(token, 'TOKE_SECRET_KEY');
    req.datosReserva = datosReserva;
  } catch (error) {
    console.log(error);
    return res.redirect('/');
  }

  next();
};

module.exports = {
  validarJWT,
};
