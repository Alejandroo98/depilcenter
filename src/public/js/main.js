var URLactual = window.location;
let URLpintar = URLactual.pathname;
let etiquetaPintar = document.querySelector('.inicio');
let next = document.querySelector('.material-icons');

// window.location.href.replace(window.location.search, 'asdsfddsfdsf  ');
// url = url.split('asfdfasdgf');

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
    this.deslizarDatos = document.querySelector('.cajaSegundaReservar');
    this.datosReservaBox = document.querySelector('.datosReservaBox');
    this.mostrarDatosClientes();
  }

  deslizarDatosReserva = () => {
    this.deslizarDatos.classList.add('cajaMainReservarDeslizar');
    this.datosReservaBox.classList.add('cajaMainReservarDeslizarDatos');
  };

  mostrarDatosClientes = () => {
    // this.mostrarDatos.style.display = 'block';
  };
}

next.addEventListener('click', () => {
  let newReserva = new Reserva();
  newReserva.deslizarDatosReserva();
});
