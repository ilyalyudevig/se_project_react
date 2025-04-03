import { baseUrl } from "./constants";
import { checkResponse } from "./checkResponse";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(url, options) {
    return fetch(url, options).then(checkResponse);
  }

  getUserItems() {
    return this._request(`${this._baseUrl}/items`, {
      headers: this._headers,
    });
  }

  addItem({ itemName: name, weather, imageUrl }, token) {
    return this._request(`${this._baseUrl}/items`, {
      method: "POST",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, weather, imageUrl }),
    });
  }

  deleteItem(id, token) {
    return this._request(`${this._baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    });
  }

  editProfile(token, { name, avatar }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, avatar }),
    });
  }

  addCardLike(id, token) {
    return this._request(`${this._baseUrl}/items/${id}/likes`, {
      method: "PUT",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    });
  }

  removeCardLike(id, token) {
    return this._request(`${this._baseUrl}/items/${id}/likes`, {
      method: "DELETE",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    });
  }
}

export const api = new Api({
  baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
