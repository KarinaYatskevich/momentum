const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");
const greetingElement = document.querySelector(".greeting");
const nameElement = document.querySelector(".name");
const bodyElement = document.getElementById("body");
const weatherIcon = document.getElementById(".weather-icon");
const temperature = document.getElementById('.temperature');
const weatherDescription = document.getElementById('.weather-description');
const city = document.getElementById('.city');

//1. Часы и календарь
function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    timeElement.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate();
    getTimeOfDay()
}

function showDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('en-US', options);
    dateElement.textContent = currentDate;
}

//2. Приветствие
function getTimeOfDay(){
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 6 && hours < 12){
        return "morning";
    }
    else if (hours >= 12 && hours < 18){
        return "afternoon"; 
    }
    else if (hours >= 18 && hours < 24){
        return "evening";
    }
    else if (hours >= 24 && hours < 6){
        return "night";
    }
}

const timeOfDay = getTimeOfDay();
greetingElement.textContent = `Good ${timeOfDay}`;


function setLocalStorage() {
    localStorage.setItem('name', nameElement.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        nameElement.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)
showTime();


//3. Слайдер изображений
function getRandomNum(){
    return Math.round(Math.random() * 10 * 2);
}

function setBg(){
    const timeOfDay = getTimeOfDay()
    const bgNum = `${getRandomNum()}`.padStart(2, '0');
    const imageUrl = createImageUrl(bgNum, timeOfDay);
    bodyElement.style.background = `url(${imageUrl})`
}

function createImageUrl(bgNum, timeOfDay){
    return `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
}

setBg()


//4. Виджет погоды

/*async function getWeather() {
    let apiKey = "6099b6337fe1f59ff85e7fbb40459164";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
    if (event.code === 'Enter') {
      getWeather();
      city.blur();
    }
  }
  
  document.addEventListener('DOMContentLoaded', getWeather);
  city.addEventListener('keypress', setCity);*/


  async function getWeather1() {  
    async function getWeather() {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
      
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.innerHTML = `${data.main.temp}°C`;
        weatherDescription.innerHTML = data.weather[0].description;
      }
  }
  getWeather1()