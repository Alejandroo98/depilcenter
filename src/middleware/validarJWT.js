const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return res.redirect('/');
  }

  try {
    const datosReserva = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
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
