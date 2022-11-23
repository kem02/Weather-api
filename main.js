import axios from "axios";

async function fetchWeather(city){
  try {
    const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=15fb73627af58b046961867b80cb18f0&units=imperial`);
    // console.log(weatherData.data);
    // console.log(weatherData.data.current.temp_f);
    if(weatherData.status == 200){
      console.log(weatherData.data);
      return weatherData.data;
    }
    else{
      return null;
    }
  }
  catch(error){
    console.log("Oh no, theres an error", error)
    displayMessage.innerText = "Please search by city name"
    form.reset()
  }
  
}
// fetchWeather("NEW YORK");

const form = document.getElementById("form");
const input = document.getElementById("my-input");
const displayMessage = document.getElementById("user-message");
const cityNameTxt = document.getElementById("city-name");
const numericTemp = document.getElementById("numeric-temp");
const weatherMain = document.getElementById("weather-main");
const weatherDetails = document.getElementById("weather-details");
const weatherImg = document.getElementById("icon");


form.addEventListener("submit", async function(event){
  event.preventDefault();
  const submittedValue = input.value;
  // console.log(submittedValue)
  // console.log(await fetchWeather(submittedValue));
  const cityData = await fetchWeather(submittedValue);

  cityNameTxt.innerText = cityData.name;
  numericTemp.innerText = `Temp: ${Math.round(cityData.main.temp)}℉`;
  weatherMain.innerText = cityData.weather[0].main
  weatherDetails.innerText = cityData.weather[0].description;
  const iconID = cityData.weather[0].icon;
  weatherImg.src = `http://openweathermap.org/img/wn/${iconID}@2x.png`;
  

  const reset = document.querySelectorAll("#my-input, #user-message");

  reset.forEach(input => {
    // console.log(input)
    if(input.value){
       input.value = ""
    }
    else{
      input.innerHTML = ""
    }
  });
  // form.reset();
  // submittedValue = "";
  // displayMessage.innerText = "";
});

document.body.style.backgroundImage = "url('https://source.unsplash.com/2400x1800/?nature')"

