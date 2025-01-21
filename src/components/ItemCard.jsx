function ItemCard({ name, link, handleCardClick }) {
  return (
    <div className="cards_card card">
      <h2 className="card__title">{name}</h2>
      <img
        className="card__image"
        src={link}
        onClick={(e) => handleCardClick(e)}
      />
    </div>
  );
}

export default ItemCard;
