/* Enviar mensaje de whtasapp al dar click en el icono que esta en la barra de arriba del navbar */
import { sendWhatsapp } from './helpers.js';

//Desde icono en  barra encima de navBar
try {
  document.querySelector('.sendWhMesage').addEventListener('click', () => sendWhatsapp(''));
} catch (error) {
  //
}

//Desde novedades
try {
  document.querySelector('.novedades-container-main').addEventListener('click', ({ target }) => {
    const salto = '%0A';
    if (target.dataset.wh) {
      const msg = encodeURI(target.dataset.wh);
      sendWhatsapp(
        `Hola 👋, estoy interesado en la promoción de:  ${msg}.${salto} Quiero mas información 📲.`
      );
    }
  });
} catch (error) {
  //
}

//wh footer
try {
  document.querySelector('.wh-footer').addEventListener('click', () => {
    sendWhatsapp('');
  });
} catch (error) {
  //
}

//desde contactos
try {
  document
    .querySelector('.sendWhMesageContactos')
    .addEventListener('click', () => sendWhatsapp(''));
} catch (error) {
  //
}

//Desde el formulario de reserva
try {
  //Esta palabra nos permite un salto de linea wn whatsapp, le llaman salto de liena que entiende la URL

  const sendMsg = () => {
    const salto = '%0A';
    let promo = '';
    let servicioOption = '';

    const descLocalStorage = localStorage.getItem('data_desc');

    if (descLocalStorage) {
      const { id, value } = JSON.parse(descLocalStorage);

      promo = encodeURI(`• Promo: ${value}.`);

      if (id) {
        try {
          servicioOption = document.getElementById(id).textContent;
        } catch (error) {
          servicioOption = '';
        }
      } else {
        servicioOption = '';
      }
    }

    const txt = `Hola 👋, quiero una cita.${salto}• Servicio: ${servicioOption}.${salto}${promo}${salto}• Nombres:${salto}• Fecha cita:${salto}• Hora cita: ${salto}• Fecha nacimiento: *opcional`;

    sendWhatsapp(txt);
  };

  document.querySelector('.agendarCitaWh').addEventListener('click', sendMsg);
} catch (error) {
  // sendWhatsapp('');
}

//Desde el view de succes, es decir cuando muestras los datos de la cita
try {
  document.querySelector('.succes-wh').addEventListener('click', () => sendWhatsapp(``));
} catch (error) {
  //
}

//Desde el black fiday
try {
  const sendMsg = () => {
    const salto = '%0A';
    const txt = `Hola 👋, quiero una cita.${salto}• Servicio: Depilación definitiva. ${salto}• Zona: Axilas.${salto}• Nombres:${salto}• Fecha cita:${salto}• Hora cita:`;

    sendWhatsapp(txt);
  };
  document.querySelector('.btn-agendar-cita').addEventListener('click', sendMsg);
} catch (error) {
  console.log(error);
}
