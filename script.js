const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const apikey = '0eee1cbb17c9785b5c3be9913214c4ee'
const clear = document.getElementById('clear');

const url = (city) =>
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), {
    origin: "cors" });    
    const respData = await resp.json();

    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp = KtoF(data.main.temp)
    const tempMin = KtoF(data.main.temp_min)
    const tempMax = KtoF(data.main.temp_max)

    // Displays weather on page
    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />${temp}°F</h2>
        <small>${data.weather[0].main}</small>
        <small>with ${data.main.humidity}% humidity</small>
        
        <h3>High: ${tempMax}°F</h3>
        <h4>Low: ${tempMin}°F</h4>
        <h5><img id="wind" src="wind.png" />Wind speed: ${data.wind.speed}MPH</h5>`
        


       


  // Clearing previously searched cities

    main.innerHTML = ""

    main.appendChild(weather);

}

// function to convert Kelvin to Farenheit
function KtoF(K) {
    return (1.8* (K - 273.15) +32).toFixed(0);
}


// Listener when hitting 'enter' for searching location 

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
})
