const getQueryUrl = () => {
  let querys = {};
  const params = new URLSearchParams(window.location.search);
  for (const param of params) {
    querys[param[0]] = param[1];
  }
  return querys;
};

const printDataDesc = (value) => {
  scrollReserva();
  guardarLocalStorage('data_desc', value);
  selectedServicios(value.id);
  printSelectDataDesc();
};

const removeSelectedChild = () => {
  const childOptionServicios = document.querySelectorAll('#serviciosActive > option');

  for (const option of childOptionServicios) {
    try {
      document.getElementById(option.id).removeAttribute('selected', '');
    } catch (error) {
      console.log('');
    }
  }
};

const selectedServicios = (id) => {
  removeSelectedChild();

  try {
    const addSelected = document.getElementById(id);
    addSelected.setAttribute('selected', '');
  } catch (error) {
    console.log('');
  }
};

const scrollReserva = () => {
  const box_reserva_partial = document.querySelector('.box-reserva-partial');
  box_reserva_partial.style.display = 'flex';
  box_reserva_partial.scrollIntoView({ block: 'center', behavior: 'smooth' });
};

const guardarLocalStorage = (key, value) => {
  const valueJSON = JSON.stringify(value);
  localStorage.setItem(key, valueJSON);
};

const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

const getLocalStorageValue = (key) => {
  const value = JSON.parse(localStorage.getItem(key));
  return value;
};

const printSelectDataDesc = () => {
  try {
    const msg_client_reserva = document.getElementById('msg-client-reserva');
    const infoReserva = document.getElementById('infoReserva');
    const { value } = getLocalStorageValue('data_desc');
    if (value) {
      msg_client_reserva.innerHTML = `<p>${value}</p>`;
      infoReserva.value = value;
    } else {
      msg_client_reserva.innerHTML = ``;
      infoReserva.value = '';
    }
  } catch (error) {
    console.log('');
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
