import { baseUrl } from "./constants";

import { checkResponse } from "./checkResponse";

export const register = (userData) => {
  const { registerEmail, registerPassword, registerName, registerAvatarUrl } =
    userData;

  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: registerEmail,
      password: registerPassword,
      name: registerName,
      avatar: registerAvatarUrl,
    }),
  }).then(checkResponse);
};

export const authorize = (userData) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then(checkResponse);
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
