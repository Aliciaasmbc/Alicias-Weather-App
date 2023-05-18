function formatDate(date) {
  let dateNumber = now.getDate();
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
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  return `${day} ${month} ${dateNumber}th ${hours}:${minutes} `;
}
let now = new Date();
let rightNow = document.querySelector("#curent-Day-Time");
rightNow.innerHTML = formatDate(now);

/////

function ClickFarenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp-C");
  temperature.innerHTML = `66`;
}
let farenheit = document.querySelector("#fahrenheit-link");
farenheit.addEventListener("click", ClickFarenheit);

function clickCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp-C");
  temperature.innerHTML = `19`;
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", clickCelsius);

////

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp-C").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#Humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#Wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-button");
searchForm.addEventListener("click", handleSubmit);

search("Paris");

////////

function searchCurrent(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temp-C");
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";

  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(function (response) {
      city.innerHTML = `${response.data.name}`;
      temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
      document.querySelector("#Humidity").innerHTML =
        response.data.main.humidity;
      document.querySelector("#Wind").innerHTML = Math.round(
        response.data.wind.speed
      );
      document.querySelector("#description").innerHTML =
        response.data.weather[0].main;
    });
  });
}

let currentForm = document.querySelector("#current-button");
currentForm.addEventListener("click", searchCurrent);
