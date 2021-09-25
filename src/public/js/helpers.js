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

const printDataDesc = (value) => {
  guardarLocalStorage('data_desc', value);
  printSelectDataDesc();
};

const guardarLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

const printSelectDataDesc = () => {
  const msg_client_reserva = document.getElementById('msg-client-reserva');
  const value = localStorage.getItem('data_desc');
  if (value) {
    msg_client_reserva.innerHTML = `<p>${value}</p>`;
  } else {
    msg_client_reserva.innerHTML = ``;
  }
};

export {
  getQueryUrl,
  scrollReserva,
  guardarLocalStorage,
  removeLocalStorage,
  printSelectDataDesc,
  printDataDesc,
};
