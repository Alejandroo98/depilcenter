const jwt = require('jsonwebtoken');
const selectHora = require('../DB/formData.json');
const servicios = require('../DB/servicios.json');

const changeValuesServicios = (idServicio, idHora) => {
  const { horaSelect } = selectHora[0];

  const { name: nameServicio, indicaciones } = servicios.find((servicio) => {
    return servicio.id == idServicio;
  });

  const { name: nameHora } = horaSelect.find((hora) => {
    return hora.id == idHora;
  });

  return { nameServicio, nameHora, indicaciones };
};

const generarJWT = (reservaData) => {
  const { nameServicio, nameHora, indicaciones } = changeValuesServicios(
    reservaData.servicio,
    reservaData.hora
  );

  return new Promise((resolve, reject) => {
    reservaData.servicioid = reservaData.servicio;
    reservaData.servicio = nameServicio;
    reservaData.hora = nameHora;
    reservaData.indicaciones = indicaciones;

    const payload = { reservaData };

    const key_token_dev = process.env.SECRET_KEY_TOKEN || 'secret_key';

    jwt.sign(
      payload,
      key_token_dev,
      {
        expiresIn: '24h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se puedo generar el token');
        }

        resolve(token);
      }
    );
  });
};

const JwtFormClient = (client) => {
  const { Nombres } = client;

  return new Promise((resolve, reject) => {
    const payload = { Nombres };

    const key_token_dev = process.env.SECRET_KEY_TOKEN || 'secret_key';

    jwt.sign(
      payload,
      key_token_dev,
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se puedo generar el token');
        }
        resolve(token);
      }
    );
  });
};

const restoreJWT = () => {
  return new Promise((resolve, reject) => {
    const payload = {};

    const key_token_dev = process.env.SECRET_KEY_TOKEN || 'secret_key';

    jwt.sign(
      payload,
      key_token_dev,
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) {
          reject(err);
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  generarJWT,
  JwtFormClient,
  restoreJWT,
};
