const weather = document.querySelector(".js-weather");
const API_KEY = "618aae53c1ae9baecb9d2488b378e86e";
// openweathermap 사이트의 API KEY
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    // API에 등록된 URL에서 데이터 가져올 때 fetch()사용.
  )
    .then(function (response) {
      return response.json();
      // response에서 json obj를 가져옴.
    })
    .then(function (json) {
      const temp = json.main.temp;
      const place = json.name;
      weather.innerText = `${temp} @ ${place}`;
    });
  // then()은 fetch()함수가 완전히 실행된 다음에 실행됨.
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude: longitude,
    // 위와 같은 문장임.
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo loacation");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
