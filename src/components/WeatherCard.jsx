import { weatherCardImages } from "../utils/weatherCardImages";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherCard, temp }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const currentCard =
    weatherCardImages.find((item) => {
      return item.name === weatherCard.name;
    }) || weatherCard;

  return (
    <section className="weather-card">
      <img
        className="weather-card__image"
        src={currentCard.image}
        alt={currentCard.name}
      />
      <p className="weather-card__paragraph">
        {temp || "--"}°{currentTemperatureUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
