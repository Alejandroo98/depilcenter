const sumarValorTotal = (desc, otrosServicios) => {
  const valorTotalZonas = document.getElementById('valorTotalZonas');

  if (desc == 'd_cera') {
    valorTotalZonas.innerHTML = `${valorTotal + otrosServicios}`;
  } else if (desc == 'd_laser') {
    valorTotalZonas.innerHTML = `${valorTotal + otrosServicios}`;
  }
};

export default sumarValorTotal;
