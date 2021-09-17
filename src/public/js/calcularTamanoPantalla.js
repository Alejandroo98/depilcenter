let agendarCumpleaniero = document.querySelector('#agendarCumpleaniero');
function tamVentana() {
  var tam = [0, 0];
  if (typeof window.innerWidth != 'undefined') {
    tam = [window.innerWidth, window.innerHeight];
  } else if (
    typeof document.documentElement != 'undefined' &&
    typeof document.documentElement.clientWidth != 'undefined' &&
    document.documentElement.clientWidth != 0
  ) {
    tam = [document.documentElement.clientWidth, document.documentElement.clientHeight];
  } else {
    tam = [
      document.getElementsByTagName('body')[0].clientWidth,
      document.getElementsByTagName('body')[0].clientHeight,
    ];
  }
  return tam;
}

class ajustarPantalla {
  constructor(anchura, altura) {
    this.anchura = anchura;
    this.altura = altura;
    this.ajustarPantalla();
  }

  ajustarPantalla() {
    var cajaContendor = document.querySelector('.cajaPrincipal');
    cajaContendor.style.height = this.altura + 'px';
  }
}

window.addEventListener('resize', () => {
  let activarClasss = new ajustarPantalla(tamVentana()[0], tamVentana()[1]);
});

let activarClasss = new ajustarPantalla(tamVentana()[0], tamVentana()[1]);

/* Lo que hace esto es crear una caja del tamaño de la caja de arriba luego  escrolea la pantalla y muestra sus elementos. Calculamos el tamaño del div  */
class ajustarPantallaReserva {
  constructor(anchura, altura) {
    this.cajaReserva = document.querySelector('.reservarHBS');
    this.altura = altura;
    this.anchura = anchura;
    this.d_cera = '50% DE DESCUENTO';
    this.d_laser = 'ULTIMA SESION GRATIS';
    this.l_faciales = 'DOS PERSONAS POR $35';
    this.m_relajantes = 'DOS PERSONAS POR $40';
    this.t_acne = 'EVALUACION GRATIS';
    this.gluteos = 'EVALUACION GRATIS';
  }

  tamDiv() {
    return {
      anchura: this.anchura,
      altura: this.altura,
    };
  }

  scroll() {
    this.imprimirInfoExtraReserva();
    this.cajaReserva.style.display = 'flex';
    this.cajaReserva.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  removeSelected() {
    let serviciosActive = document.querySelector('#serviciosActive');
    let $serviciosActive = serviciosActive.getElementsByTagName('option');
    for (let i = 0; i < $serviciosActive.length; i++) {
      document.getElementById($serviciosActive[i].id).removeAttribute('selected');
      console.log($serviciosActive[i].id);
    }
  }

  agendarCita(servicio) {
    this.removeSelected();
    let $servicio = document.getElementById(servicio);
    if (!servicio) {
      return undefined;
    } else if (servicio === 'agendarDepilacionCera') {
      $servicio.setAttribute('selected', '');
      this.guardarInfoLocalStorage(this.d_cera);
      this.scroll();
    } else if (servicio === 'agendarDepilacionLaser') {
      $servicio.setAttribute('selected', '');
      this.guardarInfoLocalStorage(this.d_laser);
      this.scroll();
    } else if (servicio === 'agendarFacial') {
      $servicio.setAttribute('selected', '');
      this.guardarInfoLocalStorage('DOS PERSONAS POR $35');
      this.scroll();
    } else if (servicio === 'agendarMasajes') {
      $servicio.setAttribute('selected', '');
      this.guardarInfoLocalStorage(this.m_relajantes);
      this.scroll();
    } else if (servicio === 'agendarAcne') {
      $servicio.setAttribute('selected', '');
      this.guardarInfoLocalStorage(this.t_acne);
      this.scroll();
    } else if (servicio === 'agendarGluteos') {
      $servicio.setAttribute('selected', '');
      this.guardarInfoLocalStorage(this.gluteos);
      this.scroll();
    }
  }

  imprimirInfoExtraReserva() {
    let $infoReserva = document.querySelector('#infoReserva');
    let InfoReserva = document.querySelector('.infoReserva');
    let infoReservaLocalSession = sessionStorage.getItem('infoReserva');
    if (infoReservaLocalSession === null) {
      InfoReserva.style.display = 'none';
      $infoReserva.value = `Sin descuento`;
      return;
    }
    InfoReserva.style.display = 'block';
    $infoReserva.value = `${infoReservaLocalSession}`;
  }

  changeSelectServicio(id_service) {
    if (id_service === 'd_cera') {
      this.guardarInfoLocalStorage(this.d_cera);
      this.imprimirInfoExtraReserva();
    } else if (id_service === 'd_laser') {
      this.guardarInfoLocalStorage(this.d_laser);
      this.imprimirInfoExtraReserva();
    } else if (id_service === 'l_facial') {
      this.guardarInfoLocalStorage(this.l_faciales);
      this.imprimirInfoExtraReserva();
    } else if (id_service === 'm_relajantes') {
      this.guardarInfoLocalStorage(this.m_relajantes);
      this.imprimirInfoExtraReserva();
    } else if (id_service === 't_acne') {
      this.guardarInfoLocalStorage(this.t_acne);
      this.imprimirInfoExtraReserva();
    } else if (id_service === 'gluteos') {
      this.guardarInfoLocalStorage(this.gluteos);
      this.imprimirInfoExtraReserva();
    }
  }

  guardarInfoLocalStorage(info) {
    sessionStorage.setItem('infoReserva', info);
  }
  eliminarInfoLocalStorage() {
    sessionStorage.removeItem('infoReserva');
  }
}

/* =============== SELECCION UN SERVICIO ========================== */
const __serviciosContainerCenterDos = document.querySelector('.__serviciosContainerCenter');
const serviciosActive = document.querySelector('#serviciosActive');
__serviciosContainerCenterDos.addEventListener('click', (e) => {
  let activarClass = new ajustarPantallaReserva();
  activarClass.agendarCita(e.target.id);
});

serviciosActive.addEventListener('change', (e) => {
  let activarClass = new ajustarPantallaReserva();
  activarClass.changeSelectServicio(serviciosActive.value);
});

//sin info extra al presonar el boton de agendar cita principal

/* =============== *FIN SELECCION UN SERVICIO ========================== */

document.querySelector('.agendarCita').addEventListener('click', () => {
  let activarClassReserva = new ajustarPantallaReserva(tamVentana()[0], tamVentana()[1]);
  activarClassReserva.guardarInfoLocalStorage('50% DE DESCUENTO');
  activarClassReserva.scroll();
});

agendarCumpleaniero.addEventListener('click', (e) => {
  let activarClass = new ajustarPantallaReserva();
  activarClass.guardarInfoLocalStorage('25% DE DESCUENTO');
  activarClass.scroll();
});

window.addEventListener('resize', () => {
  let activarClass = new ajustarPantallaReserva(tamVentana()[0], tamVentana()[1]);
  activarClass.ajustarSegundaPAntallaRserva();
});

let activarClass = new ajustarPantallaReserva(tamVentana()[0], tamVentana()[1]);
activarClass.ajustarSegundaPAntallaRserva();
activarClass.changeSelectServicio(serviciosActive.value);
// window.addEventListener('resize', () => {
//   let activarClass = new ajustarPantallaReserva(
//     tamVentana()[0],
//     tamVentana()[1]
//   );
//   activarClass.tamDiv();
// });

window.onscroll = function () {
  let navbar = document.querySelector('.navbar');
  let vertical = window.scrollY;
  if (vertical > 380) {
    navbar.classList.add('navbarBackground');
  } else {
    navbar.classList.remove('navbarBackground');
  }
};

/*FIN CONTROL DE SCROLL PARA PINTAR EL NAV */

/* ============= CAMBIAR FONDO DE CUMPLAÑEROS DEL MES ============== */
let ajusarBackgroundCumpleanieros = (ancho) => {
  if (ancho > 840) {
    imgCumpleanios.setAttribute('src', '../img/background-cumpleanios_tre.svg');
  } else if (ancho < 840 && ancho > 600) {
    imgCumpleanios.setAttribute('src', '../img/background-cumpleanierosMedium.svg');
  } else if (ancho < 600) {
    imgCumpleanios.setAttribute('src', '../img/background-cumpleanierosSmoll.svg');
  }
};

let imgCumpleanios = document.getElementById('imgCumpleanios');
window.addEventListener('resize', () => {
  ajusarBackgroundCumpleanieros(tamVentana()[0]);
});

ajusarBackgroundCumpleanieros(tamVentana()[0]);

/* =============*FIN CAMBIAR FONDO DE CUMPLAÑEROS DEL MES ============== */

/* ========ROTAS IMAGENES DE EMOJIS ============= */

let emojisImg = document.getElementById('emojisImg');

class Emojis {
  tiempo = () => {
    setTimeout(() => {
      this.rotarImg();
    }, 8000);
  };

  rotarImg = () => {
    let num = Math.floor(Math.random() * 6);
    emojisImg.setAttribute('src', `../img/emojis/emojis-${num}.svg`);

    this.tiempo();
  };
}

let rotar = new Emojis();
rotar.tiempo();

// module.exports = tamVentana;
/* ========ROTAS IMAGENES DE EMOJIS ============= */
