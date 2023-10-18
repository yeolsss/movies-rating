// 영화 전체 받아오기
import { getMovies, searchMovies } from "./getMovie.js";

// img default url
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

// document 객체
// top5 movie card div
const topMovies = document.querySelector("#top5_movies");
// popular movie card div
const popularMovies = document.querySelector("#popular_movies");
// search form
const searchForm = document.querySelector("#search_form");
// search input
const searchInput = document.querySelector("#search_input");
searchInput.focus();
// logo button (처음 페이지로 이동)
const homeBtn = document.querySelector("#home_btn");

const { results: movieList } = await getMovies;
const movieObject = movieList.reduce(
  (acc, cur, index) => {
    index < 5 ? acc.topFive.push(cur) : acc.popular.push(cur);
    return acc;
  },
  { topFive: [], popular: [] },
);

// top5 출력 함수
const createTopMovieCard = (movieList) => {
  const { topFive } = movieList;
  topMovies.innerHTML = "";
  topFive.forEach((movie, index) => {
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
        <div><h1>${index + 1}</h1></div>
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
        <div class="star-wrapper">
            <div class="star-area">
              <span class="starpoint" style="width: ${
                vote_average.toFixed(1) * 10
              }%"></span>
             </div>
            </div>
      </div>
    </div>
  `;
    topMovies.append(card);
  });
};

// popular 출력 함수
const createPopularMovieCard = (movieList, title) => {
  popularMovies.innerHTML = "";
  popularMovies.innerHTML = `
  <div class="main__popular-movies__title">
    <h1>${title}</h1>
  </div>
  `;

  movieList.forEach((movie) => {
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
      alt="이미지가 없어요.. ㅠㅠ"
      />
      <div class="main__popular-movies__info">
        <h1>${title}</h1>
        <div class="star-wrapper">
          <div class="star-area">
            <span class="starpoint" style="width: ${
              vote_average.toFixed(1) * 10
            }%"></span>
          </div>
        </div>
      </div>
  `;
    popularMovies.append(card);
  });
};

// search
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchKeyWord = event.target[0].value;
  if (searchKeyWord.replaceAll(" ", "") === "") {
    alert("검색어를 입력해 주세요.");
    return;
  }
  const response = await searchMovies(searchKeyWord);
  const { results, total_results } = response;
  createPopularMovieCard(results, `Search Movie 총 갯수 : ${total_results}`);
});

// home
homeBtn.addEventListener("click", (event) => {
  console.log("home!");
});

createTopMovieCard(movieObject);
createPopularMovieCard(movieObject.popular, "Popular Movies");
