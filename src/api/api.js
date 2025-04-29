const API_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_IMG_URL = import.meta.env.VITE_TMDB_BASE_IMAGE_URL;
const basePosterSize = "w185";

export const fetchList = async (type, list) => {
  return fetch(`${API_BASE_URL}/${type}/${list}?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then(selectiveDataExtraction);
};

export const fetchGenres = async (type) => {
  return fetch(`${API_BASE_URL}/genre/${type}/list?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => data.genres);
};

export const fetchSimilarContent = async (type, id) => {
  return fetch(`${API_BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => data).then(selectiveDataExtraction);
};

export const fetchItemDetail = async (type, id) => {
  return fetch(`${API_BASE_URL}/${type}/${id}?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => data);
};

export const fetchListByGenre = async (type, genre) => {
  return fetch(`${API_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`)
    .then((res) => res.json())
    .then(selectiveDataExtraction);
};

export function getImageUrl(path, posterSize = basePosterSize) {
  return BASE_IMG_URL + posterSize + path;
}

const selectiveDataExtraction = (data) => {
  let filteredItems = data.results.filter((r) => !r.adult);
  return filteredItems.map((item) => {
    return {
      poster: getImageUrl(item.poster_path || item.profile_path, "w300"),
      background: getImageUrl(item.backdrop_path, "w1280"),
      identifier: item.id,
      title: item.title || item.name || item.original_name,
      overview: item.overview,
      rating: item.vote_average,
    };
  });
};
