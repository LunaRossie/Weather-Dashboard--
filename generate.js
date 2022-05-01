
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

 const currentWeatherItemsEl = document.getElementById ('current-weather-items');
 const weatherForecastEl = document.getElementById('weather-forecast');
 const currentTempEl = document.getElementById('current-temp');

 const API_KEY ='c4deb69bec17d2482d93e4aeb6338604';

 setInterval(() =>{
    const day = time.getDay(); 
    const day = wind();
    const day = humidity();

 }, 1000);

 }
