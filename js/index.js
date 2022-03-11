import {API_KEY} from "../WEATHER_API_KEY.js"
const input = document.querySelector(".search");
const button = document.querySelector(".search_btn");

const weatherApi = {
    key: API_KEY,
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

// Event Listener Function on keypress
input.addEventListener('keypress', (event) => {
    if(event.keyCode === 13) {
        getWeatherReport(input.value);
    } 
});

button.addEventListener('click', () => {
    getWeatherReport(input.value);
})

// Get Weather Report
function getWeatherReport(city) {
    document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${city})`;

    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

// Show Weather Report
function showWeatherReport(weather){

    const city = document.getElementById('city_name');
    city.innerText = `Weather in ${weather.name}, ${weather.sys.country}`;

    const temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    const weatherType = document.getElementById('desc');
    weatherType.innerText = `${weather.weather[0].main}`;

    const humidity = document.querySelector("#humid");
    humidity.innerHTML = `Humidity: ${weather.main.humidity}%`

    const wind = document.querySelector("#wind");
    wind.innerHTML = `Wind Speed: ${Math.round(weather.wind.speed)} km/ph`
    
    const icon = document.querySelector(".icon");
    icon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;

}
