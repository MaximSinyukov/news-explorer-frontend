import {savedConfig} from './constants';

class Api {
  constructor(options) {
    this.url = options.baseUrl;
  }

  _handleResponse(response){
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.statusText);
    }
  }

  getUser(token) {
    return fetch(`${this.url}/users/me`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
      .then(this._handleResponse);
  }

  getSavedNews(token) {
    return fetch(`${this.url}/articles`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
      .then(this._handleResponse);
  }

  createSavedNews(data, token) {
    return fetch(`${this.url}/articles`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          keyword: data.keyword,
          title: data.title,
          text: data.description,
          date: data.publishedAt,
          source: data.source.name,
          link: data.url,
          image: (data.urlToImage ? data.urlToImage : 'https://example.example')
        })
      }
    )
      .then(this._handleResponse);
  }

  deleteSavedNews(id, token) {
    return fetch(`${this.url}/articles/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      }
    )
      .then(this._handleResponse);
  }

  registerUser(data) {
    return fetch(`${this.url}/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
    .then(this._handleResponse);
  }

  loginUser(data) {
    return fetch(`${this.url}/signin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
    .then(this._handleResponse);
  }
}

const mainApi = new Api(savedConfig);

export default mainApi;
