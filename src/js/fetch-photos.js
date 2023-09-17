import axios from 'axios';

export class apiPixabay {
  #PIXABAY_URL = 'https://pixabay.com/api/';
  #API_KEY = '39497710-1ddb4a37369e676d8d5a2e638';

  page = 1;
  q = null;
  perPage = 40;

  async fetchPhotos() {
    return (
      await axios.get(`${this.#PIXABAY_URL}`),
      {
        params: {
          q: this.q,
          page: this.page,
          per_page: this.perPage,
          key: this.#API_KEY,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
        },
      }
    );
  }
}
