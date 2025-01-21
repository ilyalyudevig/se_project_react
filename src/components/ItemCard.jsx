function ItemCard({ name, link, handleCardClick }) {
  return (
    <div className="cards_card card" onClick={(e) => handleCardClick(e)}>
      <h2 className="card__title">{name}</h2>
      <img className="card__image" src={link} />
    </div>
  );
}

export default ItemCard;
