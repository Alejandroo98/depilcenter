const etiquetaPintarCotizar = document.querySelector('.navbar');
const URLpintarCotizar = window.location.pathname;
const imgCotizarContainer = document.querySelector('.imgCotizarContainer');

import CotizarConfig from './cotizarConfig.js';
// import d_cera from '../DB/depilacion-cera.js';
// import d_definitiva from '../DB/depilacion-definitiva.js';

etiquetaPintarCotizar.setAttribute('style', 'transition : none ; background : salmon');

if (URLpintarCotizar === '/cotizar/depilacion-cera') {
  imgCotizarContainer.innerHTML = `<img src="../img/cotizar_combos/mujer_modelo_cotizar.png" alt="Modelo cotizar mujer - Depilcenter - Centro de depilacion"></img>`;
} else if (URLpintarCotizar === '/cotizar-combos/hombre') {
  imgCotizarContainer.innerHTML = `<img src="../img/cotizar_combos/hombre_modelo_cotizar.png" alt="Modelo cotizar hombre- Depilcenter - Centro de depilacion"></img>`;
}

/*  ================  PINTAR O DESPINTAR ZONA SELECCIONADA ======== */
const cajaMainCotizar = document.querySelector('#nav-tabContent');
const cotizarConfig = new CotizarConfig();

cajaMainCotizar.addEventListener('click', ({ target: { id } }) => {
  if (id != '') {
    if (id.split('_')[0] == 'C' || id.split('_')[0] == 'F') {
      document.getElementById(id).classList.toggle('zonaSeleccionada');
      cotizarConfig.comprovarZonaExiste(id);
      // console.log(d_cera[0]);
      // console.log(d_definitiva);
    }
  }
});

/*  ================  *FIN PINTAR O DESPINTAR ZONA SELECCIONADA ======== */

/* =======================MOSTRAR EL CUADRO DE REGISTRO DE DATOS PARA GENDAR CITA DESDE COTIZAR =========*/
let __datosReservaContendor = document.querySelector('.__datosReservaContendor');
let borraOpciones = document.querySelector('.borraOpciones');

class AgendarCita {
  constructor() {
    this.body = document.getElementsByTagName('body');
  }

  tamanioPantalla = () => {
    let ancho = window.innerWidth;
    let largo = window.innerHeight;

    return {
      ancho,
      largo,
    };
  };

  mostrarCajaDatos = () => {
    __datosReservaContendor.classList.remove('ocultarCajaDatosReservaFondo');
    __datosReservaContendor.style.display = 'flex';
    console.log();
    if (this.tamanioPantalla().ancho <= 840) {
      window.scrollTo(0, 0);
      console.log('dentro');
    }
  };

  ocultarCajaDatos = () => {
    __datosReservaContendor.classList.add('ocultarCajaDatosReservaFondo');
    setTimeout(() => {
      __datosReservaContendor.style.display = 'none';
    }, 800);
  };
}

__datosReservaContendor.addEventListener('click', (x) => {
  if (x.target.id === 'cerrarContainerDatos') {
    let newAgendarCita = new AgendarCita();
    newAgendarCita.ocultarCajaDatos();
  }
});

borraOpciones.addEventListener('click', (x) => {
  if (
    x.target.id === 'mostrarDatosRegistroCotizarMujer' ||
    x.target.id === 'mostrarDatosRegistroCotizarHombre'
  ) {
    let newAgendarCita = new AgendarCita();
    newAgendarCita.mostrarCajaDatos();
  }
});
/* =======================*FIN MOSTRAR EL CUADRO DE REGISTRO DE DATOS PARA GENDAR CITA DESDE COTIZAR =======*/

/* =============================================================== */
/*  ==============  SELECT HOMBRE O MUJER ===================== */
/* =============================================================== */
const url = location.pathname;

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('genero');

const activeOption = (id) => {
  document.getElementById(id).setAttribute('selected', '');
};

if (myParam == 'mujer') {
  activeOption('mujerOption');
} else if (myParam == 'hombre') {
  activeOption('hombreOption');
}

switch (url) {
  case '/cotizar/depilacion-cera':
    const depilacionCera = document.getElementById('nav-home-tab');
    depilacionCera.classList.toggle('active');
    depilacionCera.setAttribute('aria-selected', 'true');
    break;
  case '/cotizar/depilacion-definitiva':
    const depilacionDefinitiva = document.getElementById('nav-profile-tab');
    depilacionDefinitiva.classList.toggle('active');
    depilacionDefinitiva.setAttribute('aria-selected', 'true');
    break;
}

const selectHombreMujer = document.querySelector('.depilacion_cera_select');
const changeSelectValue = () => {
  if (selectHombreMujer.value == 'mujer') {
    window.location.href = `${url}?genero=mujer`;
  } else if (selectHombreMujer.value == 'hombre') {
    window.location.href = `${url}?genero=hombre`;
  }
};

selectHombreMujer.addEventListener('change', (e) => {
  changeSelectValue();
});

/* =============================================================== */
/* ============== *FIN SELECT HOMBRE O MUJER ===================== */
/* =============================================================== */
