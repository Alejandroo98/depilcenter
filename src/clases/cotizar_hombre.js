const CotizarHombreDB = require('../models/cotizar_hombre');

class CotizarHombre {
  constructor(sumaTotal, sumaTotalFacial) {
    this.corporal = [];
    this.facial = [];
    this.suma = sumaTotal;
    this.totalPAgar = 0;
    this.totalPAgarFacial = 0;
    this.mayor = 0;
    this.mayorFacial = 0;
    this.guardarMayor = [];
    this.guardarMayorFacial = [];
    this.precioFijo = '';
    this.precioFijoFacial = '';
    this.sumaFacial = sumaTotalFacial;
    this.finCotizacionMujer = 0;
  }

  buscarDatos = async () => {
    let datosCotizarCorporal = await CotizarHombreDB.find({ tipo: 'corporal' });
    let datosCotizarFacial = await CotizarHombreDB.find({ tipo: 'facial' });
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
    this.mayorFacial = 0;
    this.guardarMayor = [];
    this.precioFijo = '';
    this.precioFijoFacial = '';
    this.precioSoloCombo = 0;
    this.sumaFacial = [];
    this.guardarMayorFacial = [];
    this.finCotizacionMujer = 0;
  };

  /* ============================================= */

  buscarPrecioId = async (id) => {
    let restarPrecio;
    let precioCombo = await CotizarHombreDB.findById(id);

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
      totalPagar: this.finCotizacionMujer,
      cantidad: this.suma.length,
      precioMayor: this.precioFijo,
    };
  };

  /* ===================================== */

  buscarPrecioIdFacial = async (id) => {
    let restarPrecio;
    let precioCombo = await CotizarHombreDB.findById(id);

    let comprovar = this.sumaFacial.filter((x) => {
      return x.id === id;
    });

    // console.log(comprovar, 'comprovar');

    if (comprovar != '') {
      let posicionELiminar = this.sumaFacial.findIndex((x) => {
        return x.id === id;
      });

      this.sumaFacial.splice(posicionELiminar, 1);
      restarPrecio = this.guardarMayorFacial.indexOf(
        comprovar[0].precioIndividual
      );

      this.guardarMayorFacial.splice(restarPrecio, 1);
      this.actualizarNumeroMayorFacial();
      this.sumarTotalFacial();
    } else {
      this.sumaFacial.push({
        precioCombo: precioCombo.precioCombo,
        id,
        precioIndividual: precioCombo.precioIndividual,
      });

      this.guardarMayorPrecioFacial(precioCombo.precioIndividual);
      this.sumarTotalFacial();
    }

    return {
      totalPagar: this.finCotizacionMujer,
      cantidad: this.sumaFacial.length,
      precioMayor: this.precioFijoFacial,
    };
  };

  /* ================================================= */

  guardarMayorPrecioFacial = (precio) => {
    this.guardarMayorFacial.push(precio);
    this.actualizarNumeroMayorFacial();
  };

  actualizarNumeroMayorFacial = () => {
    let max = Math.max(...this.guardarMayorFacial);
    this.mayorFacial = max;
    this.precioMayorFacial();
  };

  precioMayorFacial = () => {
    let precioFijoFacial = this.sumaFacial.filter((x) => {
      return x.precioIndividual >= this.mayorFacial;
    });

    this.precioFijoFacial = precioFijoFacial;
  };

  /* ================================================= */

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
  /* ============================================ */

  sumarTotalFacial = () => {
    let precioMasAltoFacial = this.precioFijoFacial[0];
    this.precioSoloComboFacial = 0;
    this.totalPAgarFacial = 0;

    let eliminarPrecioAltoByIdFacial = this.sumaFacial.filter((x) => {
      return x.id != precioMasAltoFacial.id;
    });

    eliminarPrecioAltoByIdFacial.forEach((x) => {
      let X = Number(x.precioCombo);
      this.precioSoloComboFacial += X;
    });

    if (this.precioFijoFacial[0] != undefined) {
      this.totalPAgarFacial =
        parseInt(this.precioFijoFacial[0].precioIndividual) +
        parseInt(this.precioSoloComboFacial);
    } else {
      this.totalPAgarFacial = 0;
    }

    this.sumarTotalCorporalFacial();
  };

  sumarTotal = () => {
    let precioMasAlto = this.precioFijo[0];
    this.precioSoloCombo = 0;
    this.totalPAgar = 0;

    let eliminarPrecioAltoById = this.suma.filter((x) => {
      return x.id != precioMasAlto.id;
    });

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

    this.sumarTotalCorporalFacial();
  };

  sumarTotalCorporalFacial = () => {
    let sumaTotalCotizacionCorporalFacialMujer =
      parseInt(this.totalPAgar) + parseInt(this.totalPAgarFacial);
    this.finCotizacionMujer = sumaTotalCotizacionCorporalFacialMujer;
  };
}

module.exports = {
  CotizarHombre,
};
