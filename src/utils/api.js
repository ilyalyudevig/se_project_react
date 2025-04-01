import { baseUrl } from "./constants";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserItems() {
    return this._request(`${this._baseUrl}/items`, {
      headers: this._headers,
    });
  }

  addItem(item, token) {
    return this._request(`${this._baseUrl}/items`, {
      method: "POST",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify(item),
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
