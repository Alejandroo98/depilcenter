const CotizarMujerDB = require('../models/cotizar_mujer');
const Reservas = require('../models/reserva');

class CotizarMujer {
  constructor(cotizar, sumaTotal) {
    this.corporal = [];
    this.facial = [];
    this.suma = sumaTotal;
    this.totalPAgar = 0;
    this.dataCotizar = cotizar;
    this.mayor = 0;
    this.guardarMayor = [];
    this.precioFijo = '';
  }

  buscarDatos = async () => {
    let datosCotizarCorporal = await CotizarMujerDB.find({ tipo: 'corporal' });
    let datosCotizarFacial = await CotizarMujerDB.find({ tipo: 'facial' });
    this.corporal.push(...datosCotizarCorporal);
    this.facial.push(...datosCotizarFacial);

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
    this.mayor = 0;
    this.guardarMayor = [];
    this.precioFijo = '';
    this.precioSoloCombo = 0;
    // this.buscarDatos();
  };

  buscarPrecioId = async (id) => {
    let restarPrecio;
    let precioCombo = await CotizarMujerDB.findById(id);

    let comprovar = this.suma.filter((x) => {
      return x.id === id;
    });

    // console.log(comprovar, 'comprovar');

    if (comprovar != '') {
      let posicionELiminar = this.suma.findIndex((x) => {
        return x.id === id;
      });
      this.suma.splice(posicionELiminar, 1);
      restarPrecio = this.guardarMayor.indexOf(comprovar[0].precioIndividual);
      this.guardarMayor.splice(restarPrecio, 1);
      this.actualizarNumeroMayor();
      this.sumarTotal();
    } else {
      this.suma.push({
        precioCombo: precioCombo.precioCombo,
        id,
        precioIndividual: precioCombo.precioIndividual,
      });
      this.guardarMayorPrecio(precioCombo.precioIndividual);
      this.sumarTotal();
      // console.log(this.suma, 'suma');
    }

    return {
      totalPagar: this.totalPAgar,
      cantidad: this.suma.length,
      precioMayor: this.precioFijo,
    };
  };

  // buscarPrecioIdFacial = (id) =>

  guardarMayorPrecio = (precio) => {
    this.guardarMayor.push(precio);
    this.actualizarNumeroMayor();
  };

  actualizarNumeroMayor = () => {
    let max = Math.max(...this.guardarMayor);
    this.mayor = max;
    this.precioMayor();
  };

  precioMayor = () => {
    let precioFijo = this.suma.filter((x) => {
      return x.precioIndividual >= this.mayor;
    });
    /* esto devuelto el el id de los seleccionados mas alto */
    this.precioFijo = precioFijo;
  };

  sumarTotal = () => {
    let precioMasAlto = this.precioFijo[0];
    let eliminarPrecioAltoById = this.suma.filter((x) => {
      return x.id != precioMasAlto.id;
    });

    this.precioSoloCombo = 0;
    this.totalPAgar = 0;
    eliminarPrecioAltoById.forEach((x) => {
      let X = Number(x.precioCombo);
      this.precioSoloCombo += X;
    });

    if (this.precioFijo[0] != undefined) {
      this.totalPAgar =
        parseInt(this.precioFijo[0].precioIndividual) +
        parseInt(this.precioSoloCombo);
    } else {
      this.totalPAgar = 0;
    }
  };
}

module.exports = {
  CotizarMujer,
};
