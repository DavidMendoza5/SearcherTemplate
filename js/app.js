const result = document.querySelector('#resultado');

const year = document.querySelector('#year');
const brand = document.querySelector('#marca');
const min_price = document.querySelector('#minimo');
const max_price = document.querySelector('#maximo');
const total_doors = document.querySelector('#puertas');
const transmission = document.querySelector('#transmision');
const color = document.querySelector('#color');

const max_year = new Date().getFullYear();
const min_year = max_year - 10;

const search_data = {
  brand: '',
  year: '',
  min_price: '',
  max_price: '',
  doors: '',
  color: '',
  transmission: '',
};

document.addEventListener('DOMContentLoaded', () => {
  showCars(cars);
  fillOptionsSelect();
});

brand.addEventListener('change', (e) => {
  search_data.brand = e.target.value;
  filterCars();
});

year.addEventListener('change', (e) => {
  search_data.year = parseInt(e.target.value);
  filterCars();
});

min_price.addEventListener('change', (e) => {
  search_data.min_price = parseInt(e.target.value);
  filterCars();
});

max_price.addEventListener('change', (e) => {
  search_data.max_price = parseInt(e.target.value);
  filterCars();
});

total_doors.addEventListener('change', (e) => {
  search_data.doors = parseInt(e.target.value);
  filterCars();
});

transmission.addEventListener('change', (e) => {
  search_data.transmission = e.target.value;
  filterCars();
});

color.addEventListener('change', (e) => {
  search_data.color = e.target.value;
  filterCars();
});

function showCars(cars) {
  resetHtmlCarsResult();

  cars.map((car) => {
    const { marca, modelo, year, puertas, precio, transmision, color } = car;
    const cartHtmlElement = document.createElement('p');
    cartHtmlElement.textContent = `
      ${marca} ${modelo} ${year} - ${puertas} puertas - transmisión: ${transmision} - ${color} - $${precio}
    `;

    result.appendChild(cartHtmlElement);
  });
}

function showNoCarsResponse() {
  resetHtmlCarsResult();

  const htmlElement = document.createElement('p'); 
  htmlElement.classList.add('alerta', 'error');
  htmlElement.textContent = 'No hay resultados';

  result.appendChild(htmlElement);
}

function resetHtmlCarsResult() {
  while(result.firstChild) {
    result.removeChild(result.firstChild);
  }
}

function fillOptionsSelect() {
  for (let index = max_year; index >= min_year; index--) {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = index;
    year.appendChild(option);
  }
}

function filterCars() {
  const filtered_cars = cars.filter(filterCarsByBrand)
    .filter(filterCarsByYear)
    .filter(filterCarsByMinPrice)
    .filter(filterCarsByMaxPrice)
    .filter(filterCarsByDoors)
    .filter(filterCarsByTransmission)
    .filter(filterCarsByColor);
  
  if(filtered_cars.length <= 0) {
    showNoCarsResponse();
  } else {
    showCars(filtered_cars);
  }
}

function filterCarsByBrand(car) {
  const { brand } = search_data;

  if(brand) {
    return car.marca === brand;
  }
  
  return car;
}

function filterCarsByYear(car) {
  const { year } = search_data;

  if(year) {
    return car.year === year;
  }
  
  return car;
}

function filterCarsByMinPrice(car) {
  const { min_price } = search_data;

  if(min_price) {
    return car.precio >= min_price;
  }
  
  return car;
}

function filterCarsByMaxPrice(car) {
  const { max_price } = search_data;

  if(max_price) {
    return car.precio <= max_price;
  }
  
  return car;
}

function filterCarsByDoors(car) {
  const { doors } = search_data;

  if(doors) {
    return car.puertas === doors;
  }
  
  return car;
}

function filterCarsByTransmission(car) {
  const { transmission } = search_data;

  if(transmission) {
    return car.transmision === transmission;
  }
  
  return car;
}

function filterCarsByColor(car) {
  const { color } = search_data;

  if(color) {
    return car.color === color;
  }
  
  return car;
}