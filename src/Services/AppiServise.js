import axios from 'axios';

const API_KEY = '23040897-f684e552d269990a649c2a9ea';

const searchApi = async (query, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return data.hits;
};

export default searchApi;
