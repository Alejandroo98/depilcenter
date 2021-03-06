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
  }

  tamDiv() {
    return {
      anchura: this.anchura,
      altura: this.altura,
    };
  }

  ajustarSegundaPAntallaRserva() {
    // this.cajaReserva.style.height = this.tamDiv().altura + 'px';
    // this.cajaReserva.scrollIntoView({ block: 'center' });
  }

  scroll() {
    this.cajaReserva.style.display = 'flex';
    this.cajaReserva.scrollIntoView({ block: 'center', behavior: 'smooth' });
    // this.ajustarSegundaPAntallaRserva();
    // let bajar = this.tamDiv().altura + this.tamDiv().altura / 3;
    // window.scroll({
    //   top: bajar,
    //   behavior: 'smooth',
    // });
  }

  remoteSelected() {
    let serviciosActive = document.querySelector('#serviciosActive');
    let $serviciosActive = serviciosActive.getElementsByTagName('option');
    for (let i = 0; i < $serviciosActive.length; i++) {
      document.getElementById($serviciosActive[i].id).removeAttribute('selected');
      console.log($serviciosActive[i].id);
    }
  }

  agendarCita(servicio) {
    this.remoteSelected();
    let $servicio = document.getElementById(servicio);
    if (!servicio) {
      return undefined;
    } else if (
      servicio === 'agendarDepilacionCera' ||
      servicio === 'agendarDepilacionLaser' ||
      servicio === 'agendarFacial' ||
      servicio === 'agendarMasajes' ||
      servicio === 'agendarAcne' ||
      servicio === 'agendarGluteos'
    ) {
      $servicio.setAttribute('selected', '');
      this.scroll();
    }
  }
}

/* =============== SELECCION UN SERVICIO ========================== */
const __serviciosContainerCenterDos = document.querySelector('.__serviciosContainerCenter');

__serviciosContainerCenterDos.addEventListener('click', (e) => {
  let activarClass = new ajustarPantallaReserva();
  activarClass.agendarCita(e.target.id);
});

/* =============== *FIN SELECCION UN SERVICIO ========================== */

agendarCumpleaniero.addEventListener('click', (e) => {
  let activarClass = new ajustarPantallaReserva(tamVentana()[0], tamVentana()[1]);
  activarClass.scroll();
});

window.addEventListener('resize', () => {
  let activarClass = new ajustarPantallaReserva(tamVentana()[0], tamVentana()[1]);
  activarClass.ajustarSegundaPAntallaRserva();
});

document.querySelector('.agendarCita').addEventListener('click', () => {
  let activarClassReserva = new ajustarPantallaReserva(tamVentana()[0], tamVentana()[1]);
  activarClassReserva.scroll();
});

let activarClass = new ajustarPantallaReserva(tamVentana()[0], tamVentana()[1]);
activarClass.ajustarSegundaPAntallaRserva();

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

module.exports = tamVentana;
/* ========ROTAS IMAGENES DE EMOJIS ============= */
