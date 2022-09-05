
var inputval = document.querySelector('#cityinput')
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput')
var descrip = document.querySelector('#description')
var temp = document.querySelector('#temp')
var wind = document.querySelector('#wind')


function convertion(val) {
    return (val - 273).toFixed(2)

    btn.addEventListener('click', function () {


        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputval.value + '&appid=' + apik)
            .then(res => res.json())

            .then(data => {
                var nameval = data['name']
                var descrip = data['weather']['0']['description']
                var tempature = data['main']['temp']
                var wndspd = data['wind']['speed']

                city.innerHTML = `Weather of <span>${nameval}<span>`
                temp.innerHTML = `Temperature: <span>${convertion(tempature)} C</span>`
                description.innerHTML = `Sky Conditions: <span>${descrip}<span>`
                wind.innerHTML = `Wind Speed: <span>${wndspd} km/h<span>`

            })


            .catch(err => alert('You entered Wrong city name'))
    })

    const currentWeatherItemsEl = document.getElementById('current-weather-items');
    const weatherForecastEl = document.getElementById('weather-forecast');
    const currentTempEl = document.getElementById('current-temp');

    setInterval(() => {
        const day = time.getDay();
        const day = wind();
        const day = humidity();

    }, 1000);

}

let API_KEY = "c4deb69bec17d2482d93e4aeb6338604";
let currentCity = "";
let lastCity = "";

let handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
var getCurrentConditions = (event) => {
    let city = $('#search-city').val();
    currentCity = $('#search-city').val();
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + owmAPI;
    fetch(queryURL)
        .then(handleErrors)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            saveCity(city);
            let currentTimeUTC = response.dt;
            let currentTimeZoneOffset = response.timezone;
            let currentTimeZoneOffsetHours = currentTimeZoneOffset / 60 / 60;
            let currentMoment = moment.unix(currentTimeUTC).utc().utcOffset(currentTimeZoneOffsetHours);
            renderCities();
            getFiveDayForecast(event);
            $('#header-text').text(response.name);
            let currentWeatherHTML = `
            <h3>${response.name} ${currentMoment.format("(MM/DD/YY)")}<img src="${currentWeatherIcon}"></h3>
            <ul class="list-unstyled">
                <li>Temperature: ${response.main.temp}&#8457;</li>
                <li>Humidity: ${response.main.humidity}%</li>
                <li>Wind Speed: ${response.wind.speed} mph</li>
                <li id="uvIndex">UV Index:</li>
            </ul>`;
            $('#current-weather').html(currentWeatherHTML);
            let latitude = response.coord.lat;
            let longitude = response.coord.lon;
            let uvQueryURL = "api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&APPID=" + API;
            fetch(uvQueryURL)
                .then(handleErrors)
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    let uvIndex = response.value;
                    $('#uvIndex').html(`UV Index: <span id="uvVal"> ${uvIndex}</span>`);
                    if (uvIndex >= 0 && uvIndex < 3) {
                        $('#uvVal').attr("class", "uv-favorable");
                    } else if (uvIndex >= 3 && uvIndex < 8) {
                        $('#uvVal').attr("class", "uv-moderate");
                    } else if (uvIndex >= 8) {
                        $('#uvVal').attr("class", "uv-severe");
                    }
                });
        })
}
let fiveDayForecastHTML = `
        <h2>5-Day Forecast:</h2>
        <div id="fiveDayForecastUl" class="d-inline-flex flex-wrap ">`;
for (let i = 0; i < response.list.length; i++) {
    let dayData = response.list[i];
    let dayTimeUTC = dayData.dt;
    let timeZoneOffset = response.city.timezone;
    let timeZoneOffsetHours = timeZoneOffset / 60 / 60;
    let thisMoment = moment.unix(dayTimeUTC).utc().utcOffset(timeZoneOffsetHours);
    let iconURL = "https://openweathermap.org/img/w/" + dayData.weather[0].icon + ".png";
    if (thisMoment.format("HH:mm:ss") === "11:00:00" || thisMoment.format("HH:mm:ss") === "12:00:00" || thisMoment.format("HH:mm:ss") === "13:00:00") {
        fiveDayForecastHTML += `
                <div class="weather-card card m-2 p0">
                    <ul class="list-unstyled p-3">
                        <li>${thisMoment.format("MM/DD/YY")}</li>
                        <li class="weather-icon"><img src="${iconURL}"></li>
                        <li>Temp: ${dayData.main.temp}&#8457;</li>
                        <br>
                        <li>Humidity: ${dayData.main.humidity}%</li>
                    </ul>
                </div>`;
    }
}
var saveCity = (newCity) => {
    let cityExists = false;
    // Check if City exists in local storage
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage["cities" + i] === newCity) {
            cityExists = true;
            break;
        }
    }
    // Save to localStorage if city is new
    if (cityExists === false) {
        localStorage.setItem('cities' + localStorage.length, newCity);
    }
}
$('#search-button').on("click", (event) => {
    event.preventDefault();
    currentCity = $('#search-city').val();
    getCurrentConditions(event);
});
$('#city-results').on("click", (event) => {
    event.preventDefault();
    $('#search-city').val(event.target.textContent);
    currentCity = $('#search-city').val();
    getCurrentConditions(event);
});
$("#clear-storage").on("click", (event) => {
    localStorage.clear();
    renderCities();
});
renderCities();
