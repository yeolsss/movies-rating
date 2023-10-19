const AUTH =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTIwNDlkYWU3MjdmOWViZmNhNjc4NzQwOTc2MzU0ZiIsInN1YiI6IjY1MmVhN2IwMDI0ZWM4MDExZTM1ODQyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iG3vyeXBtFdibExFbEyypcdDgmMjiR1DgrGvy4FSJn0";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: AUTH,
  },
};

export const getMovies = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`,
    options,
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const searchMovies = (searchKeyWord, page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchKeyWord}&include_adult=false&language=ko-KR&page=${page}`,
    options,
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const getMovie = (movieId) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
    options,
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
};
