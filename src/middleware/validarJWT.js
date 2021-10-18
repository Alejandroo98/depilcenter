const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  const token = req.query.token;
  const key_token_dev = process.env.SECRET_KEY_TOKEN || 'secret_key';

  if (!token) {
    return res.redirect('/');
  }

  try {
    const datosReserva = jwt.verify(token, key_token_dev);
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
