/* ============= CAMBIAR FONDO DE CUMPLAÑEROS DEL MES ============== */
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

const imgCumpleanios = document.getElementById('imgCumpleanios');

let ajusarBackgroundCumpleanieros = (ancho) => {
  if (ancho > 840) {
    imgCumpleanios.setAttribute('src', '../img/cumple/large.svg');
  } else if (ancho < 840 && ancho > 600) {
    imgCumpleanios.setAttribute('src', '../img/cumple/medium.svg');
  } else if (ancho < 600) {
    imgCumpleanios.setAttribute('src', '../img/cumple/smoll.svg');
  }
};

window.addEventListener('resize', () => {
  ajusarBackgroundCumpleanieros(tamVentana()[0]);
});

ajusarBackgroundCumpleanieros(tamVentana()[0]);
// /* =============*FIN CAMBIAR FONDO DE CUMPLAÑEROS DEL MES ============== */

// /* ========ROTAS IMAGENES DE EMOJIS ============= */
// let emojisImg = document.getElementById('emojisImg');

// class Emojis {
//   tiempo = () => {
//     setTimeout(() => {
//       this.rotarImg();
//     }, 8000);
//   };

//   rotarImg = () => {
//     let num = Math.floor(Math.random() * 6);
//     emojisImg.setAttribute('src', `../img/emojis/emojis-${num}.svg`);

//     this.tiempo();
//   };
// }

// let rotar = new Emojis();
// rotar.tiempo();
// /* ========ROTAS IMAGENES DE EMOJIS ============= */
