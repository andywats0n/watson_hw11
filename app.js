// imports
import { getData } from './data.js';

// initialize global variables
let data = getData();
let dataTable = document.getElementById('tbody');

let cities = data.map(d => d.city);
let states = data.map(d => d.state);
let countries = data.map(d => d.country);

let distinctCities = Array.from(new Set(cities));
let distinctStates = Array.from(new Set(states));
let distinctCountries = Array.from(new Set(countries));

let countryDD = document.querySelector('.countries');
let stateDD = document.querySelector('.states');
let cityDD = document.querySelector('.cities');

// initialize global event listeners
countryDD.addEventListener("click", getFilterType);
stateDD.addEventListener("click", getFilterType);
cityDD.addEventListener("click", getFilterType);

// generate rows for unfiltered data set upon initial page load
generateRows(data);

// generate dropdown lists
// TODO: sort alphabetically
distinctCities.forEach(i => {
  let cityFilter = document.getElementById('city-filter');
  generateDDItem(cityFilter, i);
});
distinctStates.forEach(i => {
  let stateFilter = document.getElementById('state-filter');
  generateDDItem(stateFilter, i);
});
distinctCountries.forEach(i => {
  let countryFilter = document.getElementById('country-filter');
  generateDDItem(countryFilter, i);
});

// determine which filter is being used
function getFilterType(e) {
  let filterClicked = e.target.innerText.toLowerCase();
  return filterClicked;
}

// filter data 
function handleDDItemClick(e) {
  // TODO: filter by state/country
  e.stopPropagation();

  let filterClicked = getFilterType(e);
  console.log(filterClicked);

  let clicked = e.target.innerHTML;
  let cityElements = document.querySelectorAll('.city');

  cityElements.forEach(c => {
    if (clicked === c.innerHTML) {
      dataTable.innerHTML = ``;
      let filteredData = data.filter(x => x.city === c.innerHTML);
      generateRows(filteredData)
    }
  });
}

// helper functions
function generateDDItem(e, i) {
  let item = document.createElement('button');
  item.setAttribute("class", "dropdown-item");
  item.setAttribute("type", "button");
  item.innerHTML = `<button class="dropdown-item" type="button">${i}</button>`;
  item.addEventListener('click', handleDDItemClick)
  e.appendChild(item)
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
