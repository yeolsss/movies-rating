const AUTH =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTIwNDlkYWU3MjdmOWViZmNhNjc4NzQwOTc2MzU0ZiIsInN1YiI6IjY1MmVhN2IwMDI0ZWM4MDExZTM1ODQyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iG3vyeXBtFdibExFbEyypcdDgmMjiR1DgrGvy4FSJn0";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: AUTH,
  },
};

export const getMovies = fetch(
  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
  options,
).then((response) => response.json());
