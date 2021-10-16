import { getQueryUrl, scrollReserva } from './helpers.js';

/* ======== SELECCIONAR SERVICIOS Y HORA POR MEDIO DE QUERY ============ */
try {
  const { open, servicio, hora } = getQueryUrl();

  if (open) {
    setTimeout(() => {
      scrollReserva();
    }, 900);
  }

  document.getElementById(servicio).setAttribute('selected', '');
  document.getElementById(hora).setAttribute('selected', '');
} catch (error) {
  //
}
/* ======== *SELECCIONAR SERVICIOS POR MEDIO DE QUERY ============ */
