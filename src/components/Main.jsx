import ItemCard from './ItemCard';
import WeatherCard from './WeatherCard';

import { defaultClothingItems } from '../utils/defaultClothingItems';

function Main({ weatherCard }) {
  return (
    <main className="content">
      <WeatherCard weatherCard={weatherCard} />
      <section className="cards">
        <h2 className="cards__title">Today is 75° F / You may want to wear:</h2>
        <div className="cards__container">
          {defaultClothingItems.map(({ _id, name, weather, link }) => (
            <ItemCard key={_id} name={name} weather={weather} link={link} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
