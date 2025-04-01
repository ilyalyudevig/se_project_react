import ItemCard from "./ItemCard";
import WeatherCard from "./WeatherCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

function Main({ weatherCard, handleCardClick, items, temp, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main className="content">
      <WeatherCard weatherCard={weatherCard} temp={temp} />
      <section className="cards">
        <h2 className="cards__title">
          Today is {temp || "--"}°{currentTemperatureUnit} / You may want to
          wear:
        </h2>
        <div className="cards__container">
          {items.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              handleCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
