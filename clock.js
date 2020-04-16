const clockContatiner = document.querySelector(".js-clock"),
  clockTitle = clockContatiner.querySelector("h1");
//const clockTitle = clockContatiner.querySelector("h1");와 같음.

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
  // 1000 = 1초임. 1초마다 함수 실행하는 함수.
}

init();
