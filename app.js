// import { getData } from './data.js';

// let data = getData();

let data = d;
let dataTable = document.getElementById('tbody');
let datePicker = document.querySelector('.date-picker');

generateRows(data);
datePicker.addEventListener('click', handleClick);

$('input[name="dates"]').daterangepicker({
  singleDatePicker: true,
  startDate: data[0].datetime,
  minDate: data[0].datetime,
  maxDate: data[data.length-1].datetime,
}, (start, end, label) => {
     let filterData = data.filter(row => row.datetime === start.format('M/D/YYYY'))
     dataTable.innerHTML = ``
     generateRows(filterData)
   }
);

function handleClick(e) {
  let dates = document.querySelectorAll('.available');
  let outOfRange = document.querySelectorAll('.disabled');
  let tblHeaders = document.querySelectorAll('.table-condensed thead tr');

  dates.forEach(element => element.style.color = 'black');
  outOfRange.forEach(element => element.style.color = 'white');
  tblHeaders.forEach(element => element.style.color = 'black');
}

function generateRows(data) {
  data.forEach(i => {
    let row = document.createElement('tr')
    row.setAttribute('class', 'list-item')

    row.innerHTML = `
      <td class="date">${i.datetime}</td>
      <td class="city">${i.city}</td>
      <td class="state">${i.state}</td>
      <td class="country">${i.country}</td>
      <td class="shape">${i.shape}</td>
      <td class="duration">${i.durationMinutes}</td>
      <td class="comment">${i.comments}</td>
    `

    dataTable.appendChild(row)
  });
}
