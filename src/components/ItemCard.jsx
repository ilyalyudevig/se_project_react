function ItemCard({ name, link, _id, handleCardClick }) {
  return (
    <div
      className="cards_card card"
      onClick={(e) => handleCardClick(e)}
      id={_id}
    >
      <h2 className="card__title">{name}</h2>
      <img className="card__image" src={link} alt={name} />
    </div>
  );
}

export default ItemCard;
