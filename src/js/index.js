import {elements} from './views/base';
import {proxy, key} from './config';

////////////////////////////////////////////////////////////
// Covert C to F
const toFahrenheit = temp => {
    return Math.round(temp * ( 9 / 5 ) + 32)
}

////////////////////////////////////////////////////////////
// Render Loader
function renderLoader() {
    const markup = 
        `
          <div class="getWeather__render">
             <i class="fas fa-undo getWeather__render--icon"></i>
          </div>
        `;
    
    elements.resultPage.innerHTML = markup;
}

////////////////////////////////////////////////////////////
// Render Result
const renderRes = data => {
    const markup = `<div class="getWeather__result">
           <div class="getWeather__result--top">
               <p class="result--country"><i class="fas fa-map-marker-alt result--country--icon"></i>${data.name}</p>
                <p class="result--des">${data.weather[0].description}</p>
               <p class="result--temp">${Math.round(data.main.temp)}&#176C / ${toFahrenheit(Math.round(data.main.temp))}&#176F</p>
           </div>
           <div class="getWeather__result--bottom">
                   <p class="result--bot">Max-Temp:  ${Math.round(data.main.temp_max)}&#176c</p>
                   <p class="result--bot">Min-Temp: ${Math.round(data.main.temp_min)}&#176c</p>
            </div>
            <div class="getWeather__result--bottom">
                <p class="result--hum">Humidity: ${Math.round(data.main.humidity)}%</p>
            </div>
        </div>`;
    elements.resultPage.innerHTML = markup;
}
 
////////////////////////////////////////////////////////////
// Get Weather Data
    
async function getWeather() {
    
    // Clear value
    elements.resultPage.innerHTML = '';
    // Loader
    renderLoader();
    
    try{

        const result = await fetch(`${proxy}http://api.openweathermap.org/data/2.5/weather?q=${elements.country.value}&mode=json&appid=${key}&units=metric`);
        const data = await result.json();
        /*
        let humidity, temp, temp_max, temp_min, description, city;
        humidity = Math.round(data.main.humidity);
        temp = Math.round(data.main.temp);
        temp_max = Math.round(data.main.temp_max);
        temp_min = Math.round(data.main.temp_min);
        description = data.weather[0].description;
        city = data.name;
        */
        // Clear input value
        elements.country.value = '';
    
        // Render UI
        renderRes(data);
    }catch(error){
        alert('Please enter correct city!');

    }
}
 
////////////////////////////////////////////////////////////
// Search Control
elements.form.addEventListener('submit', function(e) {
    e.preventDefault();
    getWeather();

});

elements.btn_submit.addEventListener('click', function(e) {
    e.preventDefault();
    getWeather();

});

 