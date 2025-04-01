import ItemCard from "./ItemCard";

import { useContext } from "react";
import { UserProfileContext } from "../contexts/UserProfileContext";
import Button from "./Button";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function ClothesSection() {
  const { items, handleCardClick, onCardLike, handleAddItemsButtonClick } =
    useContext(UserProfileContext);
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="profile__clothes-section clothes-section">
      <div className="clothes-section__title-container">
        <h2 className="clothes-section__title">Your items</h2>
        <Button
          block={"clothes-section"}
          type={"add"}
          onClick={handleAddItemsButtonClick}
          buttonText={"+ Add new"}
        />
      </div>
      <div className="clothes-section__cards cards">
        <div className="cards__container">
          {items
            .filter((item) => item.owner === currentUser._id)
            .map((item) => (
              <ItemCard
                key={item._id}
                handleCardClick={handleCardClick}
                onCardLike={onCardLike}
                item={item}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
export default ClothesSection;
