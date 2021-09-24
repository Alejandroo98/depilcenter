const getQueryUrl = () => {
  let querys = {};
  const params = new URLSearchParams(window.location.search);
  for (const param of params) {
    querys[param[0]] = param[1];
  }
  return querys;
};

const scrollReserva = () => {
  const box_reserva_partial = document.querySelector('.box-reserva-partial');
  box_reserva_partial.scrollIntoView({ block: 'center', behavior: 'smooth' });
};

export { getQueryUrl, scrollReserva };
