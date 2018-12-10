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
    let filterData = data.filter(x => x.datetime === start.format('M/D/YYYY'))
    dataTable.innerHTML = ``;
    generateRows(filterData);
});

function handleClick(e) {
  let dates = document.querySelectorAll('.available')
  let outOfRange = document.querySelectorAll('.disabled')
  let tblHeaders = document.querySelectorAll('.table-condensed thead tr')

  dates.forEach(d => d.style.color = 'black')
  outOfRange.forEach(d => d.style.color = 'white')
  tblHeaders.forEach(d => d.style.color = 'black')
}

function generateRows(data) {
  data.forEach(d => {
    let row = document.createElement('tr');
    row.setAttribute("class", "list-item");

    row.innerHTML = `
      <td class="date">${d.datetime}</td>
      <td class="city">${d.city}</td>
      <td class="state">${d.state}</td>
      <td class="country">${d.country}</td>
      <td class="shape">${d.shape}</td>
      <td class="duration">${d.durationMinutes}</td>
      <td class="comment">${d.comments}</td>
    `;

    dataTable.appendChild(row);
  });
}
