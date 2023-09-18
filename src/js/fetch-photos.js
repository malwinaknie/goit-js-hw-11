import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/'
const API_KEY = '39497710-1ddb4a37369e676d8d5a2e638'

async function fetchImages(query, page, perPage) {
  const response = await axios.get(
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
  );
  return response;
}

export {fetchImages};