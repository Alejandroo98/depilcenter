class CotizarIplConfig {
  constructor() {
    this.zonasSeleccionadas = [];
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
    const sinDescuento = this.precioZonaTratamientoNormal();
    const conDescuento = this.precioZonaTratamientoDescuento();
    document.querySelector('#valorNormalCotizar').innerHTML = ` ${sinDescuento}`;
    document.querySelector('#valorTotalZonas').innerHTML = `${conDescuento}`;
  };

  printZonasSelect = () => {
    console.log(this.zonasSeleccionadas);
  };
}

export default CotizarIplConfig;
