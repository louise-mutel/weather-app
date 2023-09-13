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

function showWeather(response) {
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector(".current-temperature");
  currentTemperature.innerHTML = `${temperature}°C`;
  let weatherDescription = document.querySelector(".current-weather");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windSpeed = document.querySelector(".wind");
  let wind = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `Wind: ${wind}m/s`;
}

search("Luleå");

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

console.log(getTime());

function changeToFahrenheit(event) {
  event.preventDefault();
  let tConversion = document.querySelector("#current-temperature");
  tConversion.innerHTML = 60;
}

function changeToCelsius(event) {
  event.preventDefault();
  let tConversion = document.querySelector("#current-temperature");
  tConversion.innerHTML = 18;
}

let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

let celcius = document.querySelector(".celsius");
celcius.addEventListener("click", changeToCelsius);
