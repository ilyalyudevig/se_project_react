import { weatherCardImages } from '../utils/weatherCardImages';

function WeatherCard({ weatherCard, temp }) {
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
      <p className="weather-card__paragraph">{temp || '--'}°F</p>
    </section>
  );
}

export default WeatherCard;
