import { createContext } from "react";

export const UserProfileContext = createContext({
  username: "",
  profilePicture: "",
  clothingItems: [],
});
