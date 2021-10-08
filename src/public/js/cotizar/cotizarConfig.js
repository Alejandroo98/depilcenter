import d_cera from '../../DB/depilacion-cera.js';
import d_definitiva from '../../DB/depilacion-definitiva.js';

class CotizarConfig {
  constructor(otrosServicios) {
    this.otrosServicios = otrosServicios;
    this.zonasSeleccionadas = [];
    this.zonas = [];
    this.valorTotalZonas = document.getElementById('valorTotalZonas');
  }

  comprovarZonaExiste = ({ id, dataset }) => {
    const existe = this.zonasSeleccionadas.find((zona) => {
      return zona.id == id;
    });

    if (existe) {
      this.eliminarZona(id);
      this.numeroDeZonas();
    } else {
      this.agregarZona(id, dataset);
      this.numeroDeZonas();
    }
  };

  valorMasAlto = () => {
    let precioMasALtoArray = [];

    const precioMasAlto = this.zonasSeleccionadas.filter((zona) => {
      precioMasALtoArray = [...precioMasALtoArray, zona.precioIndividual];
      const precioAlto = Math.max(...precioMasALtoArray);
      return zona.precioIndividual == precioAlto;
    });

    const zonaValorMasALto = precioMasAlto[precioMasAlto.length - 1];
    return zonaValorMasALto;
  };

  getPath = () => {
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('genero');
    return { path, query };
  };

  numeroDeZonas = () => {
    let id = '';

    try {
      const valorMasAlto = this.valorMasAlto();
      id = valorMasAlto.id;
    } catch (error) {
      id = '';
    }

    this.getZonas('');
    this.cambiarPreciosCombo('precioIndividual');
    if (this.zonasSeleccionadas.length < 1) {
      this.getZonas(id);
      this.cambiarPreciosCombo('precioIndividual');
    }

    if (this.zonasSeleccionadas.length > 0) {
      this.getZonas(id);
      this.cambiarPreciosCombo('precioCombo');
    }
  };

  getZonas = (id) => {
    const { path, query } = this.getPath();

    if (path.split('/')[2] == 'depilacion-cera') {
      if (query == 'mujer') {
        this.zonas = this.getDepilacionCera('mujer').filter((zona) => {
          return zona.id != id;
        });
      } else if (query == 'hombre') {
        this.zonas = this.getDepilacionCera('hombre').filter((zona) => {
          return zona.id != id;
        });
      }
    } else if (path.split('/')[2] == 'depilacion-definitiva') {
      if (query == 'mujer') {
        this.zonas = this.getDepilacionDefinitiva('mujer').filter((zona) => {
          return zona.id != id;
        });
      } else if (query == 'hombre') {
        this.zonas = this.getDepilacionDefinitiva('hombre').filter((zona) => {
          return zona.id != id;
        });
      }
    }

    return this.zonas;
  };

  cambiarPreciosCombo = async (precioTxt) => {
    this.zonas.forEach((zona) => {
      document.getElementById(`precio_${zona.id}`).innerHTML = `$ ${zona[precioTxt]}`;
    });

    try {
      const { id, precioIndividual } = this.valorMasAlto();
      document.getElementById(`precio_${id}`).innerHTML = `$ ${precioIndividual}`;
    } catch (error) {}

    this.imprimirValorTotal();
  };

  getDepilacionCera = (genero) => {
    if (genero == 'mujer') {
      return d_cera[0].mujer;
    } else if (genero == 'hombre') {
      return d_cera[0].hombre;
    }
  };

  agregarZona(
    id,
    { descuento, precioindividual: precioIndividual, preciocombo: precioCombo, nombre }
  ) {
    this.zonasSeleccionadas = [
      ...this.zonasSeleccionadas,
      { id, nombre, descuento, precioIndividual, precioCombo },
    ];
  }

  eliminarZona(id) {
    this.zonasSeleccionadas = this.zonasSeleccionadas.filter((zona) => {
      return zona.id != id;
    });
  }

  precioMasAlto = () => {
    let valorMasAlto = {};

    try {
      valorMasAlto = this.valorMasAlto();
    } catch (error) {
      valorMasAlto = {};
    }

    return {
      ...valorMasAlto,
    };
  };

  handleSinDescuento() {
    const { id, precioIndividual } = this.precioMasAlto();

    let cero = 0;

    this.zonasSeleccionadas.forEach((zona) => {
      if (zona.id != id) {
        cero += Number(zona.precioCombo);
      }
    });

    const valorTotal = cero + Number(precioIndividual);

    if (!valorTotal) {
      return 0;
    }

    return valorTotal;
  }

  handleDescuento = () => {
    const { id, precioIndividual, descuento } = this.precioMasAlto();

    const restarPrecio = Number(precioIndividual) * Number(`0.${descuento}`);
    const valorTotalPrecioMasAlto = Number(precioIndividual) - restarPrecio;

    let valorTotalConDescuento = 0;

    this.zonasSeleccionadas.forEach((zona) => {
      if (zona.id != id) {
        const descuento = Number(`0.${zona.descuento}`);
        const valorDeDescueneto = Number(zona.precioCombo) * descuento;
        const valorZonaDescuento = Number(zona.precioCombo) - valorDeDescueneto;
        valorTotalConDescuento = valorTotalConDescuento + valorZonaDescuento;
      }
    });

    const valorTotal = valorTotalConDescuento + Number(valorTotalPrecioMasAlto);

    if (!valorTotal) {
      return 0;
    }

    return valorTotal;
  };

  imprimirValorTotal = () => {
    const otrosServicios = Number(this.otrosServicios.zumarValoresTotales());
    const sinDescuento = this.handleSinDescuento();
    const conDescuento = this.handleDescuento();

    document.querySelector('#valorNormalCotizar').innerHTML = `${Math.round(
      sinDescuento + otrosServicios
    )}`;
    document.querySelector('#valorTotalZonas').innerHTML = `${Math.round(
      conDescuento + otrosServicios
    )}`;
  };
}

export default CotizarConfig;
