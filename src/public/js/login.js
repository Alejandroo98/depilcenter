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

  let __containerMainLogin = document.querySelector(".__containerMainLogin");

  class tamVentanaClass {

    mainScrean = ( ancho ) => {
        __containerMainLogin.setAttribute("style" , `height: ${ ancho }px;`)
    }
      
  }
  
  window.addEventListener("resize" , () => {
      let newScrean = new tamVentanaClass();
      newScrean.mainScrean( tamVentana()[1] )
  });

  let newScrean = new tamVentanaClass();
  newScrean.mainScrean( tamVentana()[1] )
