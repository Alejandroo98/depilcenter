import { getMonth } from './getMesDia.js';
import './printDateReserve.js';
import { getQueryUrl, printDataDesc, printSelectDataDesc, scrollReserva } from './helpers.js';

/* =========== MES IMPRIMIR ( CUMPLEAÑIEROS ) ========= */
const mesActual = getMonth();
document.getElementById('mesCumpleanios').innerHTML = `Cumpleañeros de ${mesActual}`;
/* =========== *MES IMPRIMIR ( CUMPLEAÑIEROS ) ========= */

/* ==== DATA_DESC ===== */
printSelectDataDesc();

const carousel_inner = document.querySelector('.carousel-inner');
carousel_inner.addEventListener('click', ({ target }) => {
  if (target.dataset.desc) {
    const values = { id: target.dataset.id, value: target.dataset.desc };
    printDataDesc(values);
  }
});

const btn_event_agendar = document.querySelector('#btn-event-agendar');
btn_event_agendar.addEventListener('click', ({ target }) => {
  const values = { id: '', value: target.dataset.desc };
  printDataDesc(values);
});

const serviciosActive = document.getElementById('serviciosActive');
serviciosActive.addEventListener('change', ({ target }) => {
  const data_set = document.getElementById(target.value);
  const values = { id: data_set.id, value: data_set.dataset.desc };
  printDataDesc(values);
});

//Novedades
const items_cards = document.querySelector('.items-cards');
items_cards.addEventListener('click', ({ target }) => {
  if (target.dataset.id) {
    const values = { id: target.dataset.id, value: target.dataset.desc };
    printDataDesc(values);
  }
});

//Servicios
const todosLosServicios_container = document.querySelector('.todosLosServicios-container');
todosLosServicios_container.addEventListener('click', ({ target }) => {
  if (target.dataset.id) {
    const values = { id: target.dataset.id, value: target.dataset.desc };
    printDataDesc(values);
  }
});

/* ==== *DATA_DESC ===== */

/* ======== SELECCIONAR SERVICIOS Y HORA POR MEDIO DE QUERY ============ */
try {
  const { errors, servicio, hora } = getQueryUrl();

  if (errors) {
    scrollReserva();
  }

  document.getElementById(servicio).setAttribute('selected', '');
  document.getElementById(hora).setAttribute('selected', '');
} catch (error) {
  console.log('');
}
/* ======== *SELECCIONAR SERVICIOS POR MEDIO DE QUERY ============ */

window.onblur = function () {
  //Esta funcion se ejecuta cuando se cambia de pestaña en el navegador
};
