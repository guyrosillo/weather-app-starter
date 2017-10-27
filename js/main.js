const api_root_url = 'http://api.openweathermap.org/data/2.5/weather?zip='

const API_KEY = 'e5c85637d06be7e57b0788acb2ead836'

const body = document.querySelector('body');
const zip = document.querySelector('.searchBox');
const city = document.querySelector('.city');
var temp = document.querySelector('.temp');
const celsius = document.querySelector('.celsius');
const weather = document.querySelector('.weather');
// const searchBox = document.querySelector('.searchBox');
const humidity = document.querySelector('.humidity');
const icon = document.querySelector('.icon');

const groups = {
    'Rain': 'img/rain.png',
    'Clouds': 'img/cloudy.png',
    'Snow': 'img/snow.png',
    'Sunny': 'img/sun.png',
    'Clear': 'img/sun.png',
    'Thunderstorm': 'img/thunderstorm.png',
    'Drizzle': 'img/rain.png'
    }


function kelvinToFar(Kelvin){
    return Math.round(Kelvin * 9/5 - 459.67)
}

function kelvinToCel(Kelvin){
    return Math.round(Kelvin - 273.15)
}

//ajax function

function getWeather(zipCode){
    $.ajax({
        type: "GET",
        url: `${api_root_url}${zipCode},us&appid=${API_KEY}`,
        dataType: "json",
        success: function(data){
            console.log(data)
            temp.textContent = kelvinToFar(data.main.temp) + "° F"
            celsius.textContent = kelvinToCel(data.main.temp) 
            city.textContent = data.name
            weather.textContent = data.weather[0].main
            humidity.textContent = data.main.humidity
            icon.setAttribute('src', groups[data.weather[0].main])
        },
        error: function(error){
            console.log("Something has gone wrong!")
        }
    })
}

getWeather('33166')


zip.addEventListener('keypress', function(event){
    if(event.key === "Enter"){
        getWeather(zip.value)
    }
    
})


document.querySelector('#clearButton').addEventListener('click', function(){
     temp.textContent = celsius.textContent + "° C";
     

})