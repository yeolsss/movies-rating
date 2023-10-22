const AUTH =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTIwNDlkYWU3MjdmOWViZmNhNjc4NzQwOTc2MzU0ZiIsInN1YiI6IjY1MmVhN2IwMDI0ZWM4MDExZTM1ODQyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iG3vyeXBtFdibExFbEyypcdDgmMjiR1DgrGvy4FSJn0";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: AUTH,
  },
};

/**
 * 영화 정보 리스트를 url따라 api를 호출하는 함수
 * @param url - api url
 * @returns {Promise<any>} - api data를 promise로 반환
 */
export const getMovies = (url) => {
  return fetch(url, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

/**
 * 영화 디테일 정보 api 호출 함수
 * @param movieId - 영화 디테일정보를 받기위한 영화 id
 * @returns {Promise<any>} - api data를 promise로 반환
 */
export const getMovie = (movieId) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
    options,
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
};
