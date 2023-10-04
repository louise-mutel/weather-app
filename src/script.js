function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}
let form1 = document.querySelector("form");
form1.addEventListener("submit", showCity);

function search(city) {
  let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.name;
  let currentTemperature = document.querySelector(".current-temperature");
  let temperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${temperature}`;
  let weatherDescription = document.querySelector(".current-weather");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windSpeed = document.querySelector(".wind");
  let wind = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `Wind: ${wind}m/s`;
  let currentWeatherIcon = document.querySelector("#current-weather-icon");
  currentWeatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentWeatherIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showPosition(position) {
  let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector(".location-button");
locationButton.addEventListener("click", getLocation);

let time = document.querySelector(".current-time");
function getTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];

  let hour = now.getHours();
  let minutes = String(now.getMinutes()).padStart(2, "0");
  time.innerHTML = `${currentDay}, ${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6)
      forecastHTML =
        forecastHTML +
        `<div class="col forecast-column">
                <div class="row days">${formatDay(forecastDay.dt)}</div>
                <img class="row forecast-icon"
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                width = "30">
                <div class="row forecast-temperature">${Math.round(
                  forecastDay.temp.max
                )}°C | ${Math.round(forecastDay.temp.min)}°C</div>
              </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

search("Luleå");
getTime();
