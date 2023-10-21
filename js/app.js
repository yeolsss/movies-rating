// pagination class
import { Pagination } from "./pageClass.js";
// 영화 전체 받아오기
import { getMovie, getMovies } from "./getMovie.js";
// util
import { makeDateForm } from "./util.js";

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

// top5 출력 함수
const createTopMovieCard = (movieList) => {
  const { topFive } = movieList;
  $topMovies.innerHTML = "";
  topFive.forEach((movie, index) => {
    const card = document.createElement("div");
    card.classList.add("main__top5-movies__card");
    const { id, overview, title, vote_average, poster_path } = movie;
    card.innerHTML = `
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
    $topMovies.append(card);
  });
};

// popular 출력 함수
const createPopularMovieCard = (
  movieList,
  title,
  totalPage,
  currentPage = 1,
) => {
  // pagination 생성 함수 호출
  // pagination class에 받아온 movie 리스트의 totalPage 입력
  pageController.totalPage = parseInt(totalPage);
  // pagination class에 현재 page 정보 입력
  pageController.currentPage = currentPage;
  createPage();

  $popularMovies.innerHTML = "";
  $popularMovies.innerHTML = `
  <div class="main__popular-movies__title">
    <h1>${title}</h1>
  </div>
  `;

  movieList.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("main__popular-movies__card");
    const { id, title, vote_average, poster_path } = movie;
    card.innerHTML = `
          <img
          src="${IMG_PATH}${poster_path}"
          alt="이미지가 없어요.. ㅠㅠ"
          onclick="openDetail(this, ${id})"
          />
          <div class="main__popular-movies__info" onclick="openDetail(this, ${id})">
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
    $popularMovies.append(card);
  });
};

// pagination 생성 함수
const createPage = () => {
  // 생성한 pagination 넣을 부모 tag
  const $footer = document.querySelector(".footer-wrapper");
  // footer 초기화
  $footer.innerHTML = "";
  // 클로저에 저장된 데이터 호출
  const currentPageGroup = pageController.currentPageGroup;
  // 현재 pagination group의 limit 호출
  const pageGroupLimit = pageController.pageGroupLimit;
  const totalPage = pageController.totalPage;
  const currentPage = pageController.currentPage;

  // 상위 nav tag 생성
  const paginationNav = document.createElement("nav");
  paginationNav.classList.add("footer-nav");
  // 이전 화살표 그룹 div tag 생성
  const prevBtnGroup = document.createElement("div");
  prevBtnGroup.classList.add("prev__btn-group");
  prevBtnGroup.innerHTML = `
    <button value="${1}">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
      >
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          fill="currentColor"
          d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"
        />
      </svg>
    </button>
    <button value="${currentPage - 1 <= 0 ? 1 : currentPage - 1}">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 320 512"
      >
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          fill="currentColor"
          d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
        />
      </svg>
    </button>
  `;
  // nav에 이전 화살표 버튼 그룹 append
  paginationNav.append(prevBtnGroup);

  // page 숫자 버튼 그룹 생성
  const pageBtnGroup = document.createElement("div");
  pageBtnGroup.classList.add("page__btn-group");
  // pagination 버튼 그룹 limit만큼 반복문을 돌며 버튼 생성
  // 반복횟수 정하기

  let loopNum =
    pageGroupLimit * currentPageGroup > totalPage
      ? totalPage
      : pageGroupLimit * currentPageGroup;

  // 현재 page 번호와 생성되는 버튼 번호가 맞으면 active class 붙이기
  let loopStartNum = loopNum - pageGroupLimit + 1;
  let pageBtn = "";

  for (let i = loopStartNum <= 0 ? 1 : loopStartNum; i <= loopNum; i++) {
    pageBtn += `<button ${
      pageController.currentPage === i ? 'class="active-current-page"' : ""
    } value="${i}"><span>${i}</span></button>`;
  }
  // 생성된 button 그룹에 innderHTML
  pageBtnGroup.innerHTML = pageBtn;
  // 완성된 pageBtnGroup nav에 append
  paginationNav.append(pageBtnGroup);

  // 다음 화살표 그룹 div tag 생성
  const nextBtnGroup = document.createElement("div");
  nextBtnGroup.classList.add("next__btn-group");
  nextBtnGroup.innerHTML = `
  <div class="next__btn-group">
    <button value="${
      currentPage + 1 > totalPage ? currentPage : currentPage + 1
    }">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 320 512"
      >
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          fill="currentColor"
          d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
        />
      </svg>
    </button>
    <button value="${totalPage}">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
      >
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          fill="currentColor"
          d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
        />
      </svg>
    </button>
  </div>
  `;

  // nav에 이전 화살표 버튼 그룹 append
  paginationNav.append(nextBtnGroup);
  // 완성된 nav footer에 append
  $footer.append(paginationNav);
  addFooterBtnFunc();
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

// search
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

// modal close
window.closeDetail = () => {
  $detailModal.classList.remove("active-modal");
};

// movie detail btn event 등록
// onclick event
window.openDetail = async (event, id) => {
  $detailModal.classList.add("active-modal");
  const detailModalInfo = document.querySelector(".detail-modal__info");
  detailModalInfo.innerHTML = "";
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
  } = movieData;
  const releaseDate = release_date.split("-");
  const createDate = `${releaseDate[0]}.${releaseDate[1]}.${releaseDate[2]}`;
  const createGenres = genres.map((item) => {
    return item.name;
  });
  const makeRuntime = makeDateForm(runtime);

  detailModalInfo.innerHTML = `
  <div class="detail-img">
          <img
            src="${IMG_PATH}${poster_path}"
            alt=""
          />
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
  createPopularMovieCard(
    results,
    pageController.printTitle,
    total_pages,
    currentPage,
  );
};

// home
$homeBtn.addEventListener("click", async () => {
  pageController.currentPage = 1;
  pageController.searchKeyword = "";
  $searchInput.value = "";
  $searchInput.focus();
  await searchMovieFunc();
});

await searchMovieFunc();
