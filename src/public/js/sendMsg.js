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
    if (target.dataset.wh) {
      const msg = target.dataset.wh;
      sendWhatsapp(
        `Hola 👋, estoy interesado en la promoción de:  ${msg}. Quiero mas información 📲.`
      );
    }
  });
} catch (error) {
  //
}

//wh fototerapia
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
  const salto = '%0A';

  document
    .querySelector('.agendarCitaWh')
    .addEventListener('click', () =>
      sendWhatsapp(
        `Hola 👋, quiero una cita.${salto}• Nombres:${salto}• Servicio:${salto}• Fecha cita:${salto}• Hora cita: ${salto}• Fecha nacimiento: *opcional`
      )
    );
} catch (error) {
  //
}

//Desde el view de succes, es decir cuando muestras los datos de la cita
try {
  document.querySelector('.succes-wh').addEventListener('click', () => sendWhatsapp(``));
} catch (error) {
  //
}
