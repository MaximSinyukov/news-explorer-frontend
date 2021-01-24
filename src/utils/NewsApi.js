import { searchConfig } from './constants';

class SearchApi {
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

  searchNews({keyword, dateFrom, dateCurrent}) {
    return fetch(`${this.url}&q=${keyword}&from=${dateFrom}&to=${dateCurrent}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(this._handleResponse);
  }
}

const searchApi = new SearchApi(searchConfig);

export default searchApi;
