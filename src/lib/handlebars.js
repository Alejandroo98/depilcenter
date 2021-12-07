function sliceDate(numero) {
  try {
    return numero.toString().slice(-4);
  } catch (error) {
    console.log(error);
    return '123';
  }
}

function namesplit(nombres) {
  return nombres.split(' ')[0];
}

function precioPromo(precioNormal, porcentaje) {
  const porcentajeDecimal = `0.${porcentaje}`;
  const descuento = Number(porcentajeDecimal) * precioNormal;
  return precioNormal - descuento;
}

function precioPromoNavidad(precioNormal, porcentaje) {
  const porcentajeDecimal = `0.${porcentaje}`;
  const descuento = Number(porcentajeDecimal) * precioNormal;
  let totalNormal = precioNormal - descuento;
  let totalMenosUno = totalNormal - 1;
  return totalMenosUno + '.90';
}

function mayuscula(nombre) {
  return nombre.toUpperCase();
}

function indicacionesTitle(servicios) {
  if (servicios.length > 1) return 'INDICACIONES | SERVICIOS';
  const servicioName = servicios[0].seo.title + '.';
  return `INDICACIONES EN ${servicioName.toUpperCase()}`;
}

function indicacionesDesc(servicios) {
  if (servicios.length > 1) {
    let descSrvicios = '';
    servicios.map((servicio) => {
      descSrvicios += servicio.seo.title + ', ';
    });
    return `Indicaciones antes y despues para ${descSrvicios.toLowerCase()}`;
  } else {
    const desc = servicios[0].seo.title + '.';
    return `Indicaciones para antes y despues en el servicio de ${desc.toLowerCase()}`;
  }
}

function indicacionesKeyWords(servicios) {
  if (servicios.length > 1) {
    let titles = '';
    servicios.map((servicio) => {
      titles += servicio.seo.title + ', ';
    });
    return `${titles.toLowerCase()}`;
  } else {
    const title = servicios[0].seo.title + '.';
    return `${title.toLowerCase()}`;
  }
}

module.exports = {
  sliceDate,
  namesplit,
  precioPromo,
  mayuscula,
  indicacionesTitle,
  indicacionesDesc,
  indicacionesKeyWords,
  precioPromoNavidad,
};
