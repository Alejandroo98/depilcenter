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
    this.pantallaTam();
    this.cargarPagina();
  }

  cargarPagina() {
    var cajaContendor = document.querySelector('.cajaPrincipal');
    let ajustarAltura = this.altura - 58;
    cajaContendor.style.height = ajustarAltura + 'px';
    cajaContendor.style.width = this.anchura + 'px';
  }

  pantallaTam() {
    window.addEventListener('resize', () => {
      this.cambiarAtri(tamVentana()[0], tamVentana()[1]);
    });
  }

  cambiarAtri(anchura, altura) {
    var cajaContendor = document.querySelector('.cajaPrincipal');
    let ajustarAltura = altura - 58;
    cajaContendor.style.height = ajustarAltura + 'px';
    cajaContendor.style.width = anchura + 'px';
  }
}

let activarClasss = new ajustarPantalla(tamVentana()[0], tamVentana()[1]);
