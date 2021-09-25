import { getMonth } from './getMesDia.js';
import './srollServicios.js';
import './printDateReserve.js';
import { getQueryUrl, printDataDesc, scrollReserva } from './helpers.js';

/* =========== MES IMPRIMIR ( CUMPLEAÑIEROS ) ========= */
const mesActual = getMonth();
document.getElementById('mesCumpleanios').innerHTML = `Cumpleañeros de ${mesActual}`;
/* =========== *MES IMPRIMIR ( CUMPLEAÑIEROS ) ========= */

/* ==== DATA_DESC ===== */
const carousel_inner = document.querySelector('.carousel-inner');
carousel_inner.addEventListener('click', ({ target }) => {
  if (target.dataset.desc) {
    printDataDesc(target.dataset.desc);
  }
});

const serviciosActive = document.getElementById('serviciosActive');
serviciosActive.addEventListener('change', ({ target }) => {
  const data_set = document.getElementById(target.value);
  printDataDesc(data_set.dataset.desc);
});

/* ==== *DATA_DESC ===== */

/* ======== SELECCIONAR SERVICIOS POR MEDIO DE QUERY ============ */
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
