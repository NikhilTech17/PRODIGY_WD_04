const apiKey = 'API-KEY'; // Replace this with your actual API key from OpenWeatherMap

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const weatherDiv = document.getElementById('weatherResult');

  if (!city) {
    weatherDiv.innerHTML = 'Please enter a city name.';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        throw new Error(data.message);
      }

      const weather = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>☁️ Condition: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
      `;
      weatherDiv.innerHTML = weather;
    })
    .catch(error => {
      weatherDiv.innerHTML = `❌ Error: ${error.message}`;
    });
}
