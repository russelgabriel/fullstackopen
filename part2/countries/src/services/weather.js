import axios from 'axios';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const getCountryWeather = (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  const request = axios.get(url);
  return request.then(response => response.data);
}

export default {
  getCountryWeather
}