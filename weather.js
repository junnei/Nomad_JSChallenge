const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "e8073821d4d37640049c8bfcb375fcf8";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?";

function getWeather(coords) {
    fetch(
      `${WEATHER_API}lat=${coords.lat}&lon=${
        coords.lng
      }&appid=${API_KEY}&units=metric`
    )
      .then(response => response.json())
      .then(json => {
        const name = json.name;
        console.log(name);  
        const temperature = json.main.temp;
        console.log(temperature);  
        weather.innerHTML = `${Math.floor(temperature)}° @ ${name}`;
      });
  }
  
  function handleGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const coords = {
      lat,
      lng
    };
    localStorage.setItem("coords", JSON.stringify(coords));
    getWeather(coords);
  }
  
  function handleGeoFailure() {
    console.log("no location");
  }
  
  function loadWeather() {
    const currentCoords = localStorage.getItem("coords");
    if (currentCoords !== null) {
      const parsedCoords = JSON.parse(currentCoords);
      getWeather(parsedCoords);
      return;
    } else {
      navigator.geolocation.getCurrentPosition(
        handleGeoSuccess,
        handleGeoFailure
      );
    }
  }
  
  function init() {
    loadWeather();
  }
  
  init();