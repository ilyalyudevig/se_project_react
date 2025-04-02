const OPEN_WEATHER_API_KEY = "837acca28742fb9fd8c57acd128527d3";

const coords = {
  latitude: 32.0853,
  longitude: 34.7818,
};

const baseUrl = "http://localhost:3001";

const MODAL_NAMES = {
  ADD_GARMENT: "garment-form",
  ITEM: "item",
  DELETE_CONFIRM: "delete-confirm",
  REGISTER: "signup-form",
  LOGIN: "login-form",
  EDIT_PROFILE: "edit-profile-form",
};

const ITEM_MODAL_LAYOUT_OPTIONS = {
  VERTICAL: "v1",
  HORIZONTAL: "v2",
};

export {
  OPEN_WEATHER_API_KEY,
  MODAL_NAMES,
  ITEM_MODAL_LAYOUT_OPTIONS,
  coords,
  baseUrl,
};
