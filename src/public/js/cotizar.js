let socket = io();
let etiquetaPintar = document.querySelector('.cotizar');
var URLactual = window.location;
let URLpintar = URLactual.pathname;
if (URLpintar === '/cotizar-combos') {
  etiquetaPintar.classList.add('pintarNav');
}

document.querySelector('.cajaMainCotizarMujer').innerHTML = ` 
<div><h1>Femenino</h1></div>
<div id="id1" data-precio="10" > Piernas </div>
<div id="id3"  data-precio="10" >Piernas</div>
<div id="id4"  data-precio="10" >Piernas</div>
<div id="id5"  data-precio="10" >Piernas</div>
<div id="id6"  data-precio="10" >Piernas</div>
<div id="id7"  data-precio="10" >Piernas</div>
<div id="id8"  data-precio="10" >Piernas</div>
<div id="id9"  data-precio="10" >Piernas</div>
<div id="id10" data-precio="10" >Piernas</div>
<div id="id11" data-precio="10" >Piernas</div>
<div id="id12" data-precio="10" >Piernas</div>
<div id="id13" data-precio="10" >Piernas</div>`;

// ================COTIZAR=================
let cajaMainCotizarMujer = document.querySelector('.cajaMainCotizarMujer');
let preciosPagar = [0];
let sumador = 0;
let cajasPintadas = [];

class Cotizar {
  constructor(coleccion) {
    this.cejasPintadas = coleccion;
    this.totalPAgar = 0;
  }

  pintarDespintar = (data) => {
    let comprovar = this.cejasPintadas.filter((x) => {
      return x.id === data.id;
    });

    if (comprovar != '') {
      this.eliminarDato(data.id);
    } else {
      this.cejasPintadas.push(data);
      console.log(this.cejasPintadas);
      this.toggle(data.id);
      this.sumarTotal();
    }
  };

  eliminarDato = (id) => {
    this.toggle(id);
    let posicionELiminar = this.cejasPintadas.indexOf(id);
    this.cejasPintadas.splice(posicionELiminar, 1);
    this.sumarTotal();
  };

  toggle = (id) => {
    let cajaDespintar = document.getElementById(id);
    cajaDespintar.classList.toggle('cajaSelecionada');
  };

  sumarTotal = () => {
    cajasPintadas.forEach((x) => {
      let X = Number(x.precio);
      this.totalPAgar += X;
      console.log(this.totalPAgar);
      /* Aqui es dodne debems impirmir el total a pagar */
    });
  };
}

cajaMainCotizarMujer.addEventListener('click', (e) => {
  if (e.target.id != '') {
    let pintarCotizar = new Cotizar(cajasPintadas);
    pintarCotizar.pintarDespintar({
      id: e.target.id,
      precio: e.target.dataset.precio,
    });
  }
});
