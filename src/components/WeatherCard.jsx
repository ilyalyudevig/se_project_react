import { weatherCardImages } from '../utils/weatherCardImages';

function WeatherCard({ weatherCard }) {
  const card = weatherCardImages.find((item) => item.name === weatherCard);
  const temperature = '75F';
  return (
    <section className="weather-card">
      <img className="weather-card__image" src={card.image} alt={card.name} />
      <p className="weather-card__paragraph">{temperature}</p>
    </section>
  );
}

export default WeatherCard;
