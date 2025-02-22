const baseUrl = "http://localhost:3001";

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

  addItem(item) {
    return this._request(`${this._baseUrl}/items`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(item),
    });
  }

  deleteItem(id) {
    return this._request(`${this._baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}

export const api = new Api({
  baseUrl,
  headers: { "Content-Type": "application/json" },
});
