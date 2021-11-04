import { getMonth } from './getMesDia.js';
import { printDataDesc, printSelectDataDesc } from './helpers.js';

//Handle caja de confirmacion de reserva
import './confirmed.js';

//seleccionar la fecha de hoy en el formulario de reserva
import './printDateReserve.js';

//send message
import './sendMsg.js';

//overView
import './overView.js';

// change servicios options
import './serviciosActive.js';

//novedades
import './novedades.js';

// selecionar servicios por medio de query
import './selectServicios.js';

//img cumpleanieros
import './imgCumpleaniero.js';

/* =========== MES IMPRIMIR ( CUMPLEAÑIEROS ) ========= */
try {
  const mesActual = getMonth();
  document.getElementById('mesCumpleanios').innerHTML = `Cumpleañeros de ${mesActual}`;
} catch (error) {
  //
}
/* =========== *MES IMPRIMIR ( CUMPLEAÑIEROS ) ========= */

/* ==== DATA_DESC ===== */
printSelectDataDesc();

const carousel_inner = document.querySelector('.carousel-inner');
try {
  carousel_inner.addEventListener('click', ({ target }) => {
    if (target.dataset.desc) {
      const values = { id: target.dataset.id, value: target.dataset.desc };
      printDataDesc(values);
    }
  });
} catch (error) {}

const btn_event_agendar = document.querySelector('#btn-event-agendar');
try {
  btn_event_agendar.addEventListener('click', ({ target }) => {
    const values = { id: '', value: target.dataset.desc };
    printDataDesc(values);
  });
} catch (error) {}

//Servicios
const todosLosServicios_container = document.querySelector('.todosLosServicios-container');
todosLosServicios_container.addEventListener('click', ({ target }) => {
  if (target.dataset.id) {
    const values = { id: target.dataset.id, value: target.dataset.desc };
    printDataDesc(values);
  }
});

/* ==== *DATA_DESC ===== */

window.onblur = function () {
  //Esta funcion se ejecuta cuando se cambia de pestaña en el navegador
};
