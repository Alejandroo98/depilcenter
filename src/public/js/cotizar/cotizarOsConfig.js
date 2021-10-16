class cotizarOsConfig {
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

  agregarZona = (id, { precio, nombre, desc, descuento }) => {
    this.zonasSeleccionadas = [...this.zonasSeleccionadas, { id, precio, nombre, desc, descuento }];
    this.printZonasSelect();
    return this.zumarValoresTotales();
  };

  eliminarZona = (id) => {
    this.zonasSeleccionadas = this.zonasSeleccionadas.filter((zona) => {
      return zona.id != id;
    });
    this.printZonasSelect();
    return this.zumarValoresTotales();
  };

  precioZonaTratamientoDescuento = () => {
    let valorTotalConDescuento = 0;

    this.zonasSeleccionadas.forEach((zona) => {
      const precioNormal = Number(zona.precio);
      const descuento = Number(`0.${zona.descuento}`);
      const valorRestar = precioNormal * descuento;
      const valorConDescuento = precioNormal - valorRestar;

      valorTotalConDescuento = valorTotalConDescuento + valorConDescuento;
    });

    return valorTotalConDescuento;
  };

  zumarValoresTotales = () => {
    const valorTotal = this.precioZonaTratamientoDescuento();
    return valorTotal;
  };

  printZonasSelect = () => {
    return this.zonasSeleccionadas;
  };

  //   getValueSpan = (id) => {
  //     const zonaBox = document.getElementById(id);
  //     const precio = zonaBox.getElementsByTagName('span')[0].textContent.split(' ')[1];
  //     return precio;
  //   };
}

export default cotizarOsConfig;
