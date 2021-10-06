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

function mayuscula(nombre) {
  return nombre.toUpperCase();
}

module.exports = {
  sliceDate,
  namesplit,
  precioPromo,
  mayuscula,
};
