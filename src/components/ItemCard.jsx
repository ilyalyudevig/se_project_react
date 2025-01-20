function ItemCard({ name, link }) {
  return (
    <div className="cards_card card">
      <h2 className="card__title">{name}</h2>
      <img className="card__image" src={link} />
    </div>
  );
}

export default ItemCard;
