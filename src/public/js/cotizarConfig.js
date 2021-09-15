class cotizarConfig {
  constructor() {
    this.zonas = [];
    this.valorTotalZonas = document.getElementById('valorTotalZonas');
  }

  comprovarZonaExiste = (id) => {
    const existe = this.zonas.find((zona) => {
      return zona.id == id;
    });

    if (existe) {
      try {
        this.eliminarZona(id);
        const { id: idPecioMasAlto } = this.valorMasAlto();
        this.numeroDeZonas(idPecioMasAlto);
      } catch (error) {
        this.numeroDeZonas('');
      }
      this.getZonasSeleccionadas();
    } else {
      this.agregarZona(id);
      const { id: idPecioMasAlto } = this.valorMasAlto();
      this.numeroDeZonas(idPecioMasAlto);
      this.getPrecioZonas(idPecioMasAlto, 'precioCombo');
      this.getZonasSeleccionadas();
    }
  };

  valorMasAlto = () => {
    let precioMasALtoArray = [];
    const precioMasAlto = this.zonas.filter((zona) => {
      precioMasALtoArray = [...precioMasALtoArray, zona.precio];
      const precioAlto = Math.max(...precioMasALtoArray);
      return zona.precio == precioAlto;
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

  getPrecioZonas = async (id, precioTxt) => {
    const { path, query } = this.getPath();
    const zonas = await fetch('/getPreciosCombos', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ id, path, query }),
    });

    this.cambiarPreciosCombo(zonas.json(), precioTxt);
  };

  cambiarPreciosCombo = async (zonasDB, precioTxt) => {
    const { zonas } = await zonasDB;
    zonas.forEach((zona) => {
      document.getElementById(`precio_${zona.id}`).innerHTML = `$ ${zona[precioTxt]}`;
    });

    this.sumarZonas();
  };

  numeroDeZonas = (id) => {
    this.getPrecioZonas('', 'precioIndividual');
    if (this.zonas.length == 1) {
      this.getPrecioZonas(id, 'precioCombo');
    } else if (this.zonas.length < 1) {
      this.getPrecioZonas('', 'precioIndividual');
    }
  };

  agregarZona(id) {
    const precio = this.getValueSpan(id);
    this.zonas = [...this.zonas, { id, precio }];
  }

  eliminarZona(id) {
    this.zonas = this.zonas.filter((zona) => {
      return zona.id != id;
    });
  }

  getValueSpan(id) {
    const zonaBox = document.getElementById(id);
    const precio = zonaBox.getElementsByTagName('span')[0].textContent.split(' ')[1];
    return precio;
  }

  getZonasSeleccionadas() {
    console.log(this.zonas);
  }

  sumarZonas() {
    let cero = 0;

    this.zonas.forEach((zona) => {
      cero += Number(zona.precio);
    });

    this.valorTotalZonas.innerHTML = `Valor total: $${cero}`;
  }
}

export default cotizarConfig;
