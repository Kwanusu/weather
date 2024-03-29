
const apiKey = '010714eac0c9460292f015657ea9bc33';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
            for (i = 0; i < 7; i++){
                document.getElementById("day" +(i + 1)+"Min").innerHTML="Min:" +Number(data.list[i].main.temp_min - 288.53).toFixed(1)+'°C';
            }
            for (i = 0; i < 7; i++){
                document.getElementById("day" +(i + 1)+"Max").innerHTML="Max:" +Number(data.list[i].main.temp_max - 288.53).toFixed(1)+'°C';
            }
            for (i = 0; i < 7; i++){
                document.getElementById("img" +(i + 1)).src=" https://openweathermap.org/img/wn/" +data.list[i].weather[0].icon+"png";
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });

        const d = new Date();
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        
       function CheckDay(day){
        if(day +d.getDay() > 6){
            return day +d.getDay()-7;
        }
        else{
            return day +d.getDay();
        }
       }
       for (i = 0; i < 7; i++){
        document.getElementById("day" +(i + 1)).innerHTML=weekday[CheckDay(i)];    
}
}

