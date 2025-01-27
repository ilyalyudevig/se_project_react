import {
  OPEN_WEATHER_API_KEY as APIkey,
  latitude,
  longitude,
} from './constants';

function getWeather() {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
`)
    .then((res) => res.json())
    .then(({ main, clouds, name, weather: conditions, sys }) => {
      const { temp } = main;
      const { main: sky } = conditions[0];
      const { sunrise, sunset } = sys;
      const weather = temp >= 86 ? 'hot' : temp >= 66 ? 'warm' : 'cold';

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

export { getWeather };
