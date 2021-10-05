import { printDataDesc } from './helpers.js';

//Novedades
const items_cards = document.querySelector('.items-cards');
items_cards.addEventListener('click', ({ target }) => {
  if (target.dataset.id) {
    const values = { id: target.dataset.id, value: target.dataset.desc };
    printDataDesc(values);
  }
});
