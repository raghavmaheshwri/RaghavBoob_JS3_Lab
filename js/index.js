//Information about server and public key
const api = {
  key: "2ef36174ae2e8b86de764bf4187cb4d7",
  base: "https://api.openweathermap.org/data/2.5/weather"
}

//add keypress event on serach-box
const searchbox = document.getElementById('searchValve');
searchbox.addEventListener('keypress', setQuery);

//Event handler-- Keypress -- Enter key
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

//Fetch waether data from openweather site

function getResults(query) {
  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  fetch(`${api.base}?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {

      //weather object contains inforamtion in string format which we require to convert json
      return weather.json();
    }).then((response) => {
      //function to display all information on html page
      displayResults(response)
    });
}

getResults('Delhi');


function displayResults(weather) {
  const TemplateDiv = document.getElementById('weatherTemplate');
  if (weather.cod == 404) {
    TemplateDiv.innerHTML = error(weather.message);
  } else {
    console.log(weather);
    let now = new Date();

    const tmpl = ` <p class="city"><b>${weather.name}, ${weather.sys.country}</b></p>
    <p class="date">${dateBuilder(now)}</p>
    <p><img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" width="50px" height="50px" alt=""></p>
    <p class="Temp">${Math.round(weather.main.temp)} &#8451</p>
    <p class="type">${weather.weather[0].main}</p>
    <p class="range">${Math.round(weather.main.temp_min)} &#8451 / ${Math.round(weather.main.temp_max)} &#8451</p>`;

    TemplateDiv.innerHTML = tmpl;

  }
}


function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function error(msg) {
  const errorTmpl = `<p class="error">Sorry! No Result Found</p>`;
  return errorTmpl;
}