import { getData } from './data.js';

let data = getData();
let dataTable = document.getElementById('tbody');
let datePicker = document.querySelector('.date-picker');

generateRows(data);
datePicker.addEventListener('click', handleClick);

$('input[name="dates"]').daterangepicker({
    singleDatePicker: true,
    startDate: data[0].datetime,
    minDate: data[0].datetime,
    maxDate: data[data.length-1].datetime,
}, function(start, end, label) {
    let filterData = data.filter(row => row.datetime === start.format('M/D/YYYY'))
    dataTable.innerHTML = ``
    generateRows(filterData)
});

function handleClick(e) {
  let dates = document.querySelectorAll('.available');
  let outOfRange = document.querySelectorAll('.disabled');
  let tblHeaders = document.querySelectorAll('.table-condensed thead tr');

  dates.forEach(element => element.style.color = 'black');
  outOfRange.forEach(element => element.style.color = 'white');
  tblHeaders.forEach(element => element.style.color = 'black');
}

function generateRows(data) {
  data.forEach(row => {
    let row = document.createElement('tr')
    row.setAttribute('class', 'list-item')

    row.innerHTML = `
      <td class="date">${row.datetime}</td>
      <td class="city">${row.city}</td>
      <td class="state">${row.state}</td>
      <td class="country">${row.country}</td>
      <td class="shape">${row.shape}</td>
      <td class="duration">${row.durationMinutes}</td>
      <td class="comment">${row.comments}</td>
    `

    dataTable.appendChild(row)
  });
}
