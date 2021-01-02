var URLactual = window.location;
let URLpintar = URLactual.pathname;
let etiquetaPintar = document.querySelector('.inicio');
let registrarReserva = document
  .getElementById('registrarReserva')
  .addEventListener('submit', (e) => {
    e.preventDefault;
  });

if (URLpintar === '/') {
  etiquetaPintar.classList.add('pintarNav');
}

class Reserva {
  constructor() {
    this.cajaDatos = document.querySelector('.cajaMainDatos');
  }

  mostrarCajaDatos = () => {};
}
