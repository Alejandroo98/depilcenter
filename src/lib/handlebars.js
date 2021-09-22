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

module.exports = {
  sliceDate,
  namesplit,
};
