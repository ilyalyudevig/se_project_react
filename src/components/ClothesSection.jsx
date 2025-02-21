import ItemCard from "./ItemCard";

import { useContext } from "react";
import { UserProfileContext } from "../contexts/UserProfileContext";
import AddItemButton from "./AddItemButton";

function ClothesSection() {
  const { items, handleCardClick, handleAddItemsButtonClick } =
    useContext(UserProfileContext);

  return (
    <div className="profile__clothes-section clothes-section">
      <div className="clothes-section__title-container">
        <h2 className="clothes-section__title">Your items</h2>
        <AddItemButton
          blockName={"clothes-section"}
          onClick={handleAddItemsButtonClick}
          buttonText={"+ Add new"}
        />
      </div>
      <div className="clothes-section__cards cards">
        <div className="cards__container">
          {items.map((props) => (
            <ItemCard
              key={props._id}
              handleCardClick={handleCardClick}
              {...props}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default ClothesSection;
