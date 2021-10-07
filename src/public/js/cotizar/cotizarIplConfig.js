class CotizarIplConfig {
  constructor(otrosServicios) {
    this.zonasSeleccionadas = [];
    this.otrosServicios = otrosServicios;
  }

  comprovarZonaExiste = ({ id, dataset }) => {
    const existe = this.zonasSeleccionadas.find((zona) => {
      return zona.id == id;
    });

    if (existe) {
      this.eliminarZona(id);
    } else {
      this.agregarZona(id, dataset);
    }
  };

  agregarZona(id, { descuento, precio, nrosesiones: nroSesiones, nombre }) {
    this.zonasSeleccionadas = [
      ...this.zonasSeleccionadas,
      { id, nombre, descuento, precio, nroSesiones },
    ];
    this.printZonasSelect();
    this.zumarValoresTotales();
  }

  eliminarZona(id) {
    this.zonasSeleccionadas = this.zonasSeleccionadas.filter((zona) => {
      return zona.id != id;
    });
    this.zumarValoresTotales();
    this.printZonasSelect();
  }

  precioZonaTratamientoDescuento = () => {
    let valorTotalConDescuento = 0;

    this.zonasSeleccionadas.forEach((zona) => {
      const valorSinDescueneto = zona.nroSesiones * zona.precio;
      const descuento = Number(`0.${zona.descuento}`);
      const valorConDescuento = valorSinDescueneto * descuento;
      const totalTratamiento = valorSinDescueneto - valorConDescuento;
      valorTotalConDescuento = valorTotalConDescuento + totalTratamiento;
    });

    return valorTotalConDescuento;
  };

  precioZonaTratamientoNormal = () => {
    let valorTotalSinDescuento = 0;

    this.zonasSeleccionadas.forEach((zona) => {
      const valorSinDescueneto = zona.nroSesiones * zona.precio;
      valorTotalSinDescuento = valorTotalSinDescuento + valorSinDescueneto;
    });

    return valorTotalSinDescuento;
  };

  zumarValoresTotales = () => {
    const otrosServicios = Number(this.otrosServicios.zumarValoresTotales());
    const sinDescuento = this.precioZonaTratamientoNormal();
    const conDescuento = this.precioZonaTratamientoDescuento();

    if (!sinDescuento || !conDescuento) {
      document.querySelector('#valorNormalCotizar').innerHTML = 0;
      document.querySelector('#valorTotalZonas').innerHTML = 0;
      return;
    }

    document.querySelector('#valorNormalCotizar').innerHTML = `${sinDescuento + otrosServicios}`;
    document.querySelector('#valorTotalZonas').innerHTML = `${conDescuento + otrosServicios}`;
  };

  printZonasSelect = () => {
    console.log(this.zonasSeleccionadas);
  };
}

export default CotizarIplConfig;
