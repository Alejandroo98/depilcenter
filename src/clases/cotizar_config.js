const CotizarMujerDB = require('../models/cotizar_mujer');
const Reservas = require('../models/reserva');

class CotizarMujer {
  constructor(corporal, facial, sumaTotal) {
    this.buscarDatos();
    this.corporal = corporal;
    this.facial = facial;
    this.suma = sumaTotal;
    this.totalPAgar = 0;
  }

  buscarDatos = () => {
    CotizarMujerDB.find({ tipo: 'corporal' }, async (err, data) => {
      for (let i = 0; i < data.length; i++) {
        await this.corporal.push(
          `<div id="${data[i]._id}" class="griDiv" >${data[i].nombre} <div  >${data[i].precioIndividual}</div></div>`
        );
      }
    });

    CotizarMujerDB.find({ tipo: 'facial' }, async (err, data) => {
      for (let i = 0; i < data.length; i++) {
        await this.facial.push(
          `<div id="${data[i]._id}" class="griDiv" >${data[i].nombre} ${data[i].precioIndividual}</div>`
        );
      }
    });
    // console.log(this.corporal);

    let datos = {
      corporalDB: this.corporal,
      facialDB: this.facial,
    };

    return datos;
  };

  reiniciarArray = () => {
    this.corporal = [];
    this.suma = [];
    this.facial = [];
    this.totalPAgar = 0;
    this.buscarDatos();
  };

  buscarPrecioId = async (id) => {
    let precioCombo = await CotizarMujerDB.findById(id);

    let comprovar = this.suma.filter((x) => {
      return x.id === id;
    });

    if (comprovar != '') {
      console.log('condicion');
      let posicionELiminar = this.suma.findIndex((x) => {
        return x.id === id;
      });
      console.log(posicionELiminar, 'eliminar');
      this.suma.splice(posicionELiminar, 1);
      this.sumarTotal();
    } else {
      this.suma.push({ precio: precioCombo.precioCombo, id });
      this.sumarTotal();
    }
    return this.totalPAgar;
  };

  sumarTotal = () => {
    this.totalPAgar = 0;
    this.suma.forEach((x) => {
      let X = Number(x.precio);
      this.totalPAgar += X;
    });
  };
}

module.exports = {
  CotizarMujer,
};
