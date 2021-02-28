function tamVentana() {
  var tam = [0, 0];
  if (typeof window.innerWidth != 'undefined') {
    tam = [window.innerWidth, window.innerHeight];
  } else if (
    typeof document.documentElement != 'undefined' &&
    typeof document.documentElement.clientWidth != 'undefined' &&
    document.documentElement.clientWidth != 0
  ) {
    tam = [
      document.documentElement.clientWidth,
      document.documentElement.clientHeight,
    ];
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
    this.ajustarAltura = 8;
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
    this.div = document.querySelector('.cajaPrincipal');
    this.cajaReserva = document.querySelector('.reservarHBS');
    this.cajaSegundaReservar = document.querySelector('.cajaSegundaReservar');
    this.footer = document.querySelector('.boxFooter');
    this.click = document.getElementById('click');
    this.altura = altura;
    this.anchura = anchura;
    this.ultimoScroll = 0;
    this.bajarScroll();
  }

  bajarScroll() {
    // this.click.click();
    this.cajaReserva.scrollTop = 9999;
  }

  tamDiv() {
    let tamPantalla = `${this.altura}`;
    // this.cajaReserva.style.height = `${this.altura}px`;
    return tamPantalla;
  }

  scroll() {
    // this.cajaReserva.style.display = 'block';
    setTimeout((x) => {
      window.scroll({
        top: this.tamDiv(),
        behavior: 'smooth',
      });
    }, 20);
  }
}

let data = false;

document.querySelector('.agendarCita').addEventListener('click', () => {
  data = true;
  let activarClassReserva = new ajustarPantallaReserva(
    tamVentana()[0],
    tamVentana()[1]
  );
  activarClassReserva.scroll();
});

window.addEventListener('resize', () => {
  let activarClass = new ajustarPantallaReserva(
    tamVentana()[0],
    tamVentana()[1]
  );
  activarClass.tamDiv();
});

/* CONTROL DE SCROLL PARA PINTAR EL NAV */
let lastScrollTop = 0;
let pintarOpacity = 0;
// window.addEventListener(
//   'scroll',
//   function () {
//     let st = window.pageYOffset || document.documentElement.scrollTop;
//     // let entero = st.toFixed();
//     let divicion = st / 3;
//     console.log(divicion);
//     let navbar = document.querySelector('.navbar');
//     if (st > divicion) {
//       //baja
//       console.log('Desaparecer');
//     } else {
//       //sube
//       console.log('Mostrar');
//     }
//     lastScrollTop = st;
//   },
//   false
// );
window.onscroll = function () {
  let navbar = document.querySelector('.navbar');
  console.log('Vertical: ' + window.scrollY);
  let vertical = window.scrollY;
  if (vertical > 380) {
    navbar.classList.add('navbarBackground');
  } else {
    navbar.classList.remove('navbarBackground');
  }
};

/*FIN CONTROL DE SCROLL PARA PINTAR EL NAV */
