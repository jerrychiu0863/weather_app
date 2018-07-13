////////////////////////////////////////////////////////////
// DOM elements
const elements = {
        API_KEY: 'a23bb8de6d412c9e8dddf84a52193a99',
        country: document.getElementById('country'),
        resultPage: document.getElementById('getWeather'),
        btn_submit: document.getElementById('btn_submit'),
        form: document.getElementById('form')
}

////////////////////////////////////////////////////////////
// Covert C to F
function Fahrenheit(temp) {
    return Math.round(temp * ( 9 / 5 ) + 32)
}

////////////////////////////////////////////////////////////
// Render Function
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
// Get Weather Data
    
async function getWeather() {
    
    // Clear value
    elements.resultPage.innerHTML = '';
    // Loader
    renderLoader();
    
    try{

        const result = await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${elements.country.value}&mode=json&appid=${elements.API_KEY}&units=metric`);
        const data = await result.json();
        let humidity, temp, temp_max, temp_min, description, city;
        humidity = Math.round(data.main.humidity);
        temp = Math.round(data.main.temp);
        temp_max = Math.round(data.main.temp_max);
        temp_min = Math.round(data.main.temp_min);
        description = data.weather[0].description;
        city = data.name;
        
        // Clear input value
        elements.country.value = '';
    
        // Render UI
        var msg;
        msg = `<div class="getWeather__result">
           <div class="getWeather__result--top">
               <p class="result--country"><i class="fas fa-map-marker-alt result--country--icon"></i>${city}</p>
                <p class="result--des">${description}</p>
               <p class="result--temp">${temp}&#176C / ${Fahrenheit(temp)}&#176F</p>
           </div>
           <div class="getWeather__result--bottom">
                   <p class="result--bot">Max-Temp:  ${temp_max}&#176c</p>
                   <p class="result--bot">Min-Temp: ${temp_min}&#176c</p>
            </div>
            <div class="getWeather__result--bottom">
                <p class="result--hum">Humidity: ${humidity}%</p>
            </div>
        </div>`;
        elements.resultPage.innerHTML = msg;
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

