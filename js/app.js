// pagination util
import { Pagination, createPagination } from "./paginationUtil.js";
// 영화 전체 받아오기
import { getMovie, getMovies } from "./getMovie.js";
// util
import { makeDateForm, makeRatingCircle } from "./util.js";

// img default url
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

// document 객체
// top5 movie card div
const $topMovies = document.querySelector("#top5_movies");
// popular movie card div
const $popularMovies = document.querySelector("#popular_movies");
// search form
const $searchForm = document.querySelector("#search_form");
// search input
const $searchInput = document.querySelector("#search_input");
$searchInput.focus();
// logo button (처음 페이지로 이동)
const $homeBtn = document.querySelector("#home_btn");
// detail modal
const $detailModal = document.querySelector("#detail_modal");

// page 객체 생성
const pageController = new Pagination();

/**
 * top5 출력 함수
 * @param movieList - 출력할 데이터(배열인 매개변수)
 */
const createTopMovieCard = (movieList) => {
  const { topFive } = movieList;
  $topMovies.innerHTML = "";
  topFive.forEach((movie, index) => {
    const $card = document.createElement("div");
    $card.classList.add("main__top5-movies__card");
    const { id, overview, title, vote_average, poster_path } = movie;
    const ratingCircle = makeRatingCircle(vote_average, "top");
    $card.innerHTML = `
       <div class="main__top5-movies__card">
          <div>
              <div><h1>${index + 1}</h1></div>
            <img
              src="${IMG_PATH}${poster_path}"
              alt="이미지가 없어요.. ㅠㅠ"
            />
          </div>
          <div class="main__top5-movies__info" onclick="openDetail(this, ${id})">
            <h1>${title}</h1>
            <p>
              ${overview}
            </p>
            ${ratingCircle}
          </div>  
        </div>`;
    $topMovies.append($card);
  });
};

/**
 * popular, 검색 결과 출력 함수
 * @param movieList - 출력할 데이터(배열인 매개변수)
 */
const createPopularMovieCard = (movieList) => {
  createPagination(pageController);
  addFooterBtnFunc();
  const title = pageController.printTitle;
  $popularMovies.innerHTML = "";
  $popularMovies.innerHTML = `
  <div class="main__popular-movies__title">
    <h1>${title}</h1>
  </div>
  `;

  movieList.forEach((movie) => {
    const $card = document.createElement("div");
    $card.classList.add("main__popular-movies__card");
    const { id, title, vote_average, poster_path } = movie;
    // 평점 원 생성 함수 호출
    const ratingCircle = makeRatingCircle(vote_average, "popular");
    $card.innerHTML = `
          <div class="main__popular-movies__img-wrapper">
            <img
            src="${IMG_PATH}${poster_path}"
            alt="이미지가 없어요.. ㅠㅠ"
            onclick="openDetail(this, ${id})"
            />
            ${ratingCircle}
          </div>
          <div class="main__popular-movies__info" onclick="openDetail(this, ${id})">
            <h1>${title}</h1>
          </div>
  `;
    $popularMovies.append($card);
  });
};

// pagination btn event 등록
const addFooterBtnFunc = () => {
  const $footerBtn = document.querySelectorAll(".footer-wrapper button");
  $footerBtn.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      pageController.currentPage = parseInt(event.target.value);
      await searchMovieFunc();
    });
  });
};

// search form event
$searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchKeyword = event.target[0].value;
  if (searchKeyword.replaceAll(" ", "") === "") {
    alert("검색어를 입력해 주세요.");
    return;
  }
  pageController.currentPage = 1;
  pageController.searchKeyword = searchKeyword;
  await searchMovieFunc();
});

/**
 * modal close 함수
 * js파일의 type이 module로 선언 되었을 경우 window 객체 메소드를 사용하여 접근한다.
 */
window.closeDetail = () => {
  pointerController();
  $detailModal.classList.remove("active-modal");
};

/**
 * modal 이 열리고 닫힐때 css요소인 pointer-events를 none 할 수있는
 * class를 추가 또는 삭제하는 함수
 * modal이 보일때 modal의 형제 노드들의 이벤트를 막기위함.
 */
const pointerController = () => {
  const $container = document.querySelector("#body");
  $container.classList.toggle("remove-pointer");
};

/**
 * movie detail btn event 등록
 * onclick event
 * @param event - 메소드 호출(click)한 객체(this)
 * @param id - 데이터를 불러올 영화id
 * @returns {Promise<void>}
 */
window.openDetail = async (event, id) => {
  $detailModal.classList.add("active-modal");
  const $detailModalInfo = document.querySelector(".detail-modal__info");
  pointerController();
  $detailModalInfo.innerHTML = "";
  const movieData = await getMovie(id);
  const {
    original_language,
    overview,
    tagline,
    title,
    poster_path,
    release_date,
    genres,
    runtime,
    vote_average,
  } = movieData;

  const releaseDate = release_date.split("-");
  const createDate = `${releaseDate[0]}.${releaseDate[1]}.${releaseDate[2]}`;
  const ratingCircle = makeRatingCircle(vote_average, "modal");
  const createGenres = genres.map((item) => {
    return item.name;
  });
  const makeRuntime = makeDateForm(runtime);

  $detailModalInfo.innerHTML = `
      <div class="detail-img">
          <img
            src="${IMG_PATH}${poster_path}"
            alt=""
          />
          ${ratingCircle}
        </div>
        <div class="detail__info-wrapper">
          <h1>${title}</h1>
          <div class="detail__sub-info">
            <span>${createDate} (${original_language})</span>
            <div class="dot"></div>
            <span>${createGenres.join(",")}</span>
            <div class="dot"></div>
            <span>${makeRuntime}</span>
          </div>
          <span class="detail__sub-title"
            >${tagline}</span
          >
          <div class="detail__overwrite">
            <h3>줄거리</h3>
            <p>
              ${overview === "" ? "줄거리 정보가 없습니다." : overview}
            </p>
          </div>
        </div>
        <div class="detail__close-btn" onclick="closeDetail()">
          <button class="del-btn"></button>
        </div>
  `;
};

// 검색, 페이지 번호 눌렀을 때 결과값 처리 함수
const searchMovieFunc = async () => {
  const keyword = pageController.searchKeyword;
  const currentPage = pageController.currentPage;
  const popularApiUrl = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${currentPage}`;
  const searchApiUrl = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ko-KR&page=${currentPage}`;
  const { results, total_pages, total_results } =
    keyword !== ""
      ? await getMovies(searchApiUrl)
      : await getMovies(popularApiUrl);

  if (keyword !== "") {
    pageController.printTitle = `Search Movie (총 갯수 : ${total_results})`;
  } else {
    pageController.printTitle = "Popular Movies";
    pageController.movieObject = results;
    currentPage === 1 ? createTopMovieCard(pageController.movieObject) : "";
  }
  pageController.totalPage = total_pages;
  pageController.currentPage = currentPage;
  createPopularMovieCard(results);
};

// home
$homeBtn.addEventListener("click", async () => {
  pageController.currentPage = 1;
  pageController.searchKeyword = "";
  $searchInput.value = "";
  $searchInput.focus();
  await searchMovieFunc();
});

// 첫 로딩시 movie정보를 출력
await searchMovieFunc();
