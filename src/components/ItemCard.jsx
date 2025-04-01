import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function ItemCard({ item, handleCardClick, onCardLike }) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser._id);

  function handleLike(e) {
    e.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  }

  return (
    <div className="cards_card card" onClick={handleCardClick} id={item._id}>
      <div className="card__title-like-container">
        <h2 className="card__title">{item.name}</h2>
        {isLoggedIn && (
          <button
            className={`card__like-button ${
              isLiked ? "card__like-button_checked" : ""
            }`}
            type="button"
            aria-label="Like button"
            onClick={handleLike}
          ></button>
        )}
      </div>
      <img className="card__image" src={item.imageUrl} alt={item.name} />
    </div>
  );
}

export default ItemCard;
