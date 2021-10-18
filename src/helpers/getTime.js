const getHour = () => {
  const date = new Date();
  const hora = `${date.getHours()}:${date.getMinutes()}`;
  return hora;
};

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

module.exports = {
  getHour,
  getDate,
};
