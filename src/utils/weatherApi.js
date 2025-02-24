import { OPEN_WEATHER_API_KEY as APIkey, coords } from "./constants";

const { latitude, longitude } = coords;

let temperature = {};

function getWeather() {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}`);
    })
    .then(({ main, clouds, name, weather: conditions, sys }) => {
      const { temp } = main;
      const { main: sky } = conditions[0];
      const { sunrise, sunset } = sys;
      const weather = temp >= 86 ? "hot" : temp >= 66 ? "warm" : "cold";

      temperature = {
        F: Math.round(temp),
        C: Math.round(((temp - 32) * 5) / 9),
      };

      return {
        weather,
        temp,
        clouds,
        location: name,
        sky,
        sunrise,
        sunset,
      };
    });
}

export { getWeather, temperature };
