let now = new Date();
let h2 = document.querySelector(".now");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];
h2.innerHTML = `${day}, ${month} ${date}, ${year} ${hours}:${minutes}`;

function displayForecast(response){
  console.log(response.data.daily);
  let forecastElement=document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun"];
  let forecastHTML=`<div class="row">`;
  days.forEach(function(day) {
    forecastHTML=forecastHTML+
   `<div class="col-2">
          <div class="weather-forecast-date">${day}</div>
          <img src="https://openweathermap.org/img/wn/01n@2x.png" alt="" width="42" />
          <div class="weather-forecast-temperature"><span class="weather-forecast-temperature-max"> 18°</span><span
              class="weather-forecast-temperature-min"> 12°</span>
              </div>
              </div>`;
  });
  forecastHTML=forecastHTML+ `</div>`
  forecastElement.innerHTML=forecastHTML;
}
function getForecast(coordinates){
  console.log(coordinates);
   let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
   let apiUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
   axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondtion(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  fahrenheitTemperature = response.data.main.temp;
  getForecast(response.data.coord);

  document.querySelector("#humidiy").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
    document.querySelector("#icon").setAttribute("src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` );
  
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "29efdffbbb604fc727c4004093a47818";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondtion);
}

function searchLocation(position) {
  console.log(position);
  let apiKey = "29efdffbbb604fc727c4004093a47818";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondtion);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayCelsiusTemperature (event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  
  let celsiusTemperature=((fahrenheitTemperature-32)*5)/9;
  temperatureElement.innerHTML=Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement=document.querySelector("#temperature");
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",displayCelsiusTemperature);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#Current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");

 