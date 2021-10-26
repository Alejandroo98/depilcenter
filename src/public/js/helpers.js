const getDate = () => {
  let dateInput = new Date();
  const month = dateInput.getMonth() + 1;
  const day = dateInput.getDate();
  const year = dateInput.getFullYear();
  let dayCero = '';
  let monthCero = '';

  if (month < 10) {
    monthCero = 0;
  } else {
    monthCero = '';
  }

  if (day < 10) {
    dayCero = 0;
  } else {
    dayCero = '';
  }

  const fullDate = `${dayCero}${day}-${monthCero}${month}-${year} `;
  return fullDate;
};

const changeTitle = () => {
  try {
    const $promo_cera_title = document.querySelector('.data-promocion-cera');
    const capitalizar = $promo_cera_title.dataset.titlecera;
    const minusculas = capitalizar.toLowerCase();
    const title_promo_cera = minusculas.replace(/^\w/, (c) => c.toUpperCase());

    const servicio_cera = $promo_cera_title.dataset.serviciocera;

    document.title = `${servicio_cera} | ${title_promo_cera} | Quito-Ecuador`;
  } catch (error) {
    //
  }
};

const sendWhatsapp = (msg = '') => {
  const url = `https://api.whatsapp.com/send?phone=593984266244&text=${msg}`;
  window.open(url, '_blank');
  // window.location.href = 'https://www.facebook.com';
};

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
    //
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

const pinarDespintar = (id) => {
  document.getElementById(id).classList.toggle('zonaSeleccionada');
  document.querySelector(`.check_${id}`).classList.toggle('checkSeleccionadoBlack');
  document.querySelector(`.check_${id}`).classList.toggle('checkSeleccionado');
};

export {
  getQueryUrl,
  scrollReserva,
  guardarLocalStorage,
  removeLocalStorage,
  printSelectDataDesc,
  printDataDesc,
  pinarDespintar,
  sendWhatsapp,
  changeTitle,
  getDate,
};
