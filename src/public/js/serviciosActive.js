import { printDataDesc } from './helpers.js';

const serviciosActive = document.getElementById('serviciosActive');
serviciosActive.addEventListener('change', ({ target }) => {
  const data_set = document.getElementById(target.value);
  const values = { id: data_set.id, value: data_set.dataset.desc };
  printDataDesc(values);
});
