// бібліотека axios
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '45552769-3540ba49dba2ab2d34c825df8';

export const fetchPhotos = searchedQuery => {
  const axiosOptions = {
    params: {
      key: API_KEY,
      q: searchedQuery,
      orientation: 'horizontal',
      per_page: 20,
      safesearch: 'true',
    },
  };
  return axios.get('', axiosOptions);
};
