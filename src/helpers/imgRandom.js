const img = [
  'https://i.ibb.co/NrgS6qY/img-mujer-01.png',
  'https://i.ibb.co/J27XkfC/img-mujer-02.png',
  'https://i.ibb.co/WVcwbmg/img-mujer-03.png',
  'https://i.ibb.co/jGRrNM1/img-mujer-04.png',
  'https://i.ibb.co/rHvwngV/img-mujer-05.png',
  'https://i.ibb.co/1ZsJ4N0/img-mujer-06.png',
  'https://i.ibb.co/jwNT5tZ/img-mujer-07.png',
  'https://i.ibb.co/LPxYkmJ/img-mujer-08.png',
];

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min));
};

const imgRandom = () => {
  return img[getRandomInt(1, 9)];
};

module.exports = { imgRandom };
