import ItemCard from './ItemCard';
import WeatherCard from './WeatherCard';

function Main({ weatherCard, handleCardClick, items, temp }) {
  return (
    <main className="content">
      <WeatherCard weatherCard={weatherCard} temp={temp} />
      <section className="cards">
        <h2 className="cards__title">
          Today is {temp || '--'}°F / You may want to wear:
        </h2>
        <div className="cards__container">
          {items.map((props) => (
            <ItemCard
              key={props._id}
              handleCardClick={handleCardClick}
              {...props}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
