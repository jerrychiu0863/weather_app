////////////////////////////////////////////////////////////
// DOM elements
const elemetes = {
        API_KEY: 'a23bb8de6d412c9e8dddf84a52193a99',
        country: document.getElementById('country'),
        resultPage: document.getElementById('getWeather'),
        btn_submit: document.getElementById('btn_submit'),
        form: document.getElementById('form')
}

////////////////////////////////////////////////////////////
// Get Weather Data
    
async function getWeather() {
    try{

        const result = await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${elemetes.country.value}&mode=json&appid=${elemetes.API_KEY}&units=metric`);
        const data = await result.json();
        let humidity, temp, temp_max, temp_min, description, city;
        humidity = data.main.humidity;
        temp = Math.round(data.main.temp);
        temp_max = data.main.temp_max;
        temp_min = data.main.temp_min;
        description = data.weather[0].description;
        city = data.name;

        // Clear value
        elemetes.country.value = '';
        elemetes.resultPage.innerHTML = '';

        // Prepare render UI

        // Render UI
        var msg;
        msg = `<div class="getWeather__result">
           <div class="getWeather__result--top">
               <p class="result--country">${city}</p>
                <p class="result--des">${description}</p>
               <p class="result--temp">${temp}&#176c</p>
           </div>
           <div class="getWeather__result--bottom">
               <p class="result--bot">Max-Temp: ${temp_max}</p>
               <p class="result--bot">Min-Temp: ${temp_min}</p>
               <p class="result--hum">Humidity: ${humidity}</p>
           </div>
        </div>`;
        elemetes.resultPage.innerHTML = msg;
    }catch(error){
        alert('Please enter correct city!');

    }
}

////////////////////////////////////////////////////////////
// DOM elements
    elemetes.form.addEventListener('submit', function(e) {
        e.preventDefault();
        getWeather();
     
    });

    elemetes.btn_submit.addEventListener('click', function(e) {
        e.preventDefault();
        getWeather();
     
    });