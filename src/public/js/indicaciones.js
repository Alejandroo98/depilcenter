import { getQueryUrl } from './helpers.js';

/* Pintar dependiente la pestaña en la que se encuentre por medio de el query servicios */
try {
  const servicio = getQueryUrl().servicio;
  document.getElementById(servicio).classList.toggle('view-active');
  document.getElementById(`${servicio}_`).classList.toggle('view-active');
} catch (error) {
  //
}
