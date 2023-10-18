// 영화 전체 받아오기
import { getMovies } from "./getMovie.js";

// img default url
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

// document 객체
// top5 movie card div
const topMovies = document.querySelector("#top5_movies");
// popular movie card div
const popularMovies = document.querySelector("#popular_movies");

// top 5 movie arr
const movieCategoryObj = {
  topFive: [],
  popular: [],
};
const { results: movieList } = await getMovies;
const movieObject = movieList.reduce((acc, cur, index) => {
  index < 5 ? acc.topFive.push(cur) : acc.popular.push(cur);
  return acc;
}, movieCategoryObj);

// top5 출력 함수
const createTopMovieCard = (movieList) => {
  const { topFive } = movieList;
  topMovies.innerHTML = "";
  topFive.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("main__top5-movies__card");
    const {
      id,
      original_language,
      original_title,
      overview,
      title,
      vote_average,
      vote_count,
      poster_path,
    } = movie;
    card.innerHTML = `
  <div class="main__top5-movies__card">
      <div>
        <img
          src="${IMG_PATH}${poster_path}"
          alt="이미지가 없시요"
        />
      </div>
      <div class="main__top5-movies__info">
        <h1>${title}</h1>
        <p>
          ${overview}
        </p>
        <p>Rating: ${vote_average}</p>
      </div>
    </div>
  `;
    topMovies.append(card);
  });
};

// popular 출력 함수
const createPopularMovieCard = (movieList) => {
  popularMovies.innerHTML = "";
  popularMovies.innerHTML = `
  <div class="main__popular-movies__title">
    <h1>Popular Movies</h1>
  </div>
  `;

  const { popular } = movieList;
  popular.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("main__popular-movies__card");
    const {
      id,
      original_language,
      original_title,
      overview,
      title,
      vote_average,
      vote_count,
      poster_path,
    } = movie;
    card.innerHTML = `
      <img
      src="${IMG_PATH}${poster_path}"
      alt="이미지가 없시요"
      />
      <div class="main__popular-movies__info">
        <h1>${title}</h1>
        <p>Rating: ${vote_average}</p>
      </div>
  `;
    popularMovies.append(card);
  });
};

createTopMovieCard(movieObject);
createPopularMovieCard(movieObject);
