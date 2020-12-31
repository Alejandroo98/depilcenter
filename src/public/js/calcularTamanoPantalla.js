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
    this.pantallaTam();
    this.cargarPagina();
  }

  cargarPagina() {
    var cajaContendor = document.querySelector('.cajaPrincipal');
    let ajustarAltura = this.altura - this.ajustarAltura;
    cajaContendor.style.height = ajustarAltura + 'px';
    // cajaContendor.style.width = this.anchura + 'px';
  }

  pantallaTam() {
    window.addEventListener('resize', () => {
      this.cambiarAtri(tamVentana()[0], tamVentana()[1]);
    });
  }

  cambiarAtri(anchura, altura) {
    var cajaContendor = document.querySelector('.cajaPrincipal');
    let ajustarAltura = altura - this.ajustarAltura;
    cajaContendor.style.height = ajustarAltura + 'px';
    // cajaContendor.style.width = anchura + 'px';
  }
}

let activarClasss = new ajustarPantalla(tamVentana()[0], tamVentana()[1]);

/* Lo que hace esto es crear una caja del tamaño de la caja de arriba luego  escrolea la pantalla y muestra sus elementos. Calculamos el tamaño del div  */
class ajustarPantallaReserva {
  constructor() {
    this.div = document.querySelector('.cajaPrincipal');
    this.cajaReserva = document.querySelector('.cajaMainReservar');
    this.alturaDiv = this.div.clientHeight;
    this.anchuraDiv = this.div.clientWidth;
    this.scroll();
  }

  tamDiv() {
    let tamPantalla = `${this.alturaDiv}`;
    this.cajaReserva.style.height = `${this.alturaDiv}px`;
    this.ocultarMostrarReserva();
    return tamPantalla;
  }

  scroll() {
    window.scroll({
      top: this.tamDiv() + 15,
      behavior: 'smooth',
    });
  }

  ocultarMostrarReserva() {
    this.cajaReserva.style.display = 'flex';
  }
}

document.querySelector('.agendarCita').addEventListener('click', () => {
  let activarClassReserva = new ajustarPantallaReserva();
});
