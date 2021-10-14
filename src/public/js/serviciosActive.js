import { printDataDesc, getQueryUrl } from './helpers.js';

const serviciosActive = document.getElementById('serviciosActive');

const changePromoServicio = ({ target }) => {
  try {
    const data_set = document.getElementById(target.value);
    const values = { id: data_set.id, value: data_set.dataset.desc };
    printDataDesc(values);
  } catch (error) {
    //
  }
};

try {
  serviciosActive.addEventListener('change', changePromoServicio);
  const { servicio } = getQueryUrl();
  const servicioId = {
    target: {
      value: servicio,
    },
  };

  changePromoServicio(servicioId);
} catch (error) {
  //
}
