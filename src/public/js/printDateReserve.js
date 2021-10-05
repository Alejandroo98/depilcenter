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

try {
  let fullDate = `${dayCero}${day}-${monthCero}${month}-${year} `;
  let form_control_date = document.querySelector('.form-control-date');
  if (form_control_date.value == '') {
    form_control_date.value = fullDate;
  }
} catch (error) {
  //
}
