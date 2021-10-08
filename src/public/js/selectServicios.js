import { getQueryUrl, scrollReserva } from './helpers.js';

/* ======== SELECCIONAR SERVICIOS Y HORA POR MEDIO DE QUERY ============ */
try {
  const { errors, servicio, hora } = getQueryUrl();

  if (errors) {
    scrollReserva();
  }

  document.getElementById(servicio).setAttribute('selected', '');
  document.getElementById(hora).setAttribute('selected', '');
} catch (error) {
  //
}
/* ======== *SELECCIONAR SERVICIOS POR MEDIO DE QUERY ============ */
