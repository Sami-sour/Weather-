const searchIcon = document.querySelector(".search-icon");
const searchInput = document.querySelector(".enter-country");
const weatherInfo = document.querySelector(".weather-information");
const weatherMess = document.querySelector(".weather-message");
const errorMess = document.querySelector(".error-mess");
errorMess.innerHTML = "";

searchIcon.addEventListener("click", () => {
  weatherMess.innerHTML = "";
  fetchingWeatherApi();
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchingWeatherApi();
  }
});

const fetchingWeatherApi = async () => {
  const URL = ` https://api.weatherapi.com/v1/current.json?key=8d2b8aa769634f51862145041252910&q=${searchInput.value}&aqi=no`;

  try {
    const fetchUrl = await fetch(URL);
    const response = await fetchUrl.json();
    console.log(response.current.condition.text);

    const div = document.createElement("div");
    weatherInfo.innerHTML = "";
    div.innerHTML = `
    
        <div class="weather-information">
          <div class="country-info">
            <div class="country">${response.location.country}</div>
            <div class="country-name">${response.location.name}</div>
            <div class="condition">${response.current.condition.text}</div>
            <div class="temp">${response.current.temp_c}°C</div>
        </div>
          <div class="weather-forcast">
            <div class="first-div">
              <div class="wind-directio">Wind Direction : ${response.current.wind_dir}</div>
              <div class="preci">Precipitation: ${response.current.precip_in}</div>
              <div class="pressure">Pressure: ${response.current.pressure_mb}(millibar)</div>
            </div>
            <div class="second-div">
              <div class="temp-fre">Temperature in F: ${response.current.temp_f}</div>
              <div class="latitude">Latitude: ${response.location.lat}</div>
              <div class="longitude">Longitude: ${response.location.lon}</div>
            </div>
          </div>

          <div class="wea-info">
            <div class="wind">
              <div class="wind-img">
                <i class="fa-solid fa-wind"></i>
              </div>
              <div class="km">${response.current.wind_kph}km/h</div>
              <div class="wind-title">Wind</div>
            </div>

            <div class="humidity">
              <div class="humidity-image">
                <i class="fa-solid fa-droplet"></i>
              </div>
              <div class="per">${response.current.humidity}%</div>
              <div class="name">Humidity</div>
            </div>

            <div class="visibility">
              <div class="visib-img">
                <i class="fa-solid fa-eye"></i>
              </div>
              <div class="vis-in-km">${response.current.vis_km}km</div>
              <div class="vis-name">Visibility</div>
            </div>
          </div>
        </div>`;
    weatherInfo.appendChild(div);
    searchInput.value = "";
    errorMess.innerHTML = "";
    console.log(div);
  } catch (error) {
    console.log("error");
    errorMess.innerHTML =
      "You have enter a wrong country name please check and enter again";
    weatherInfo.innerHTML = "";
  }
};
