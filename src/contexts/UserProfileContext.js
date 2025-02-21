import { createContext } from "react";

import { defaultClothingItems } from "../utils/defaultClothingItems";

export const UserProfileContext = createContext({
  username: "",
  profilePicture: "",
  clothingItems: defaultClothingItems,
});
