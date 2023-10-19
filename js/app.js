// 영화 전체 받아오기
import { getMovies, searchMovies } from "./getMovie.js";

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

// pagination
// 현재 검색 또는 로딩시 불러온 api에 page closure
const pageClosure = () => {
  let totalPage = 1;
  let currentPageGroup = 1;
  let currentPage = 1;
  let searchKeyword = "";
  let searchTitle = "";
  const pageGroupLimit = 5;
  let movieObject = null;
  return {
    setTotalPage(getTotalPage) {
      totalPage = getTotalPage <= 0 ? 1 : getTotalPage;
    },
    getTotalPage() {
      return totalPage;
    },
    setCurrentPage(getCurrentPage) {
      if (getCurrentPage > 500) getCurrentPage = 500;

      currentPage = getCurrentPage <= 0 ? 1 : getCurrentPage;
    },
    getCurrentPage() {
      return currentPage;
    },
    setCurrentPageGroup() {
      // 소수점은 올림처리하여 그룹 하나를 더 만든다.
      currentPageGroup = Math.ceil(currentPage / pageGroupLimit);
    },
    getCurrentPageGroup() {
      return currentPageGroup;
    },
    getGroupLimit() {
      return pageGroupLimit;
    },
    setSearchKeyword(keyword) {
      searchKeyword = keyword.replaceAll(" ", "") === "" ? "" : keyword;
    },
    getSearchKeyword() {
      return searchKeyword;
    },
    setSearchTitle(title) {
      searchTitle = title;
    },
    getSearchTitle() {
      return searchTitle;
    },
    setMovieObject(results) {
      movieObject = results.reduce(
        (acc, cur, index) => {
          if (index < 5) {
            acc.topFive.push(cur);
          }
          acc.popular.push(cur);
          return acc;
        },
        { topFive: [], popular: [] },
      );
    },
    getMovieObject() {
      return movieObject;
    },
  };
};

// page 관련 클로저 생성
const pageController = pageClosure();

// top5 출력 함수
const createTopMovieCard = (movieList) => {
  const { topFive } = movieList;
  $topMovies.innerHTML = "";
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
  // return html문자열 반환
  createPage(totalPage, currentPage);

  $popularMovies.innerHTML = "";
  $popularMovies.innerHTML = `
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
const createPage = (totalPage, currentPage) => {
  // pagination 관련 클로저에 받아온 movie 리스트의 total_page 입력
  pageController.setTotalPage(parseInt(totalPage));
  // pagination 관련 클로저에 현재 page 정보 입력
  pageController.setCurrentPage(parseInt(currentPage));

  // 생성한 pagination 넣을 부모 tag
  const $footer = document.querySelector(".footer-wrapper");
  // footer 초기화
  $footer.innerHTML = "";
  // 클로저에 저장된 데이터 호출
  pageController.setCurrentPageGroup();
  const currentPageGroup = pageController.getCurrentPageGroup();
  // 현재 pagination group의 limit 호출
  const pageGroupLimit = pageController.getGroupLimit();

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
    pageGroupLimit * currentPageGroup > pageController.getTotalPage()
      ? pageController.getTotalPage()
      : pageGroupLimit * currentPageGroup;

  // 현재 page 번호와 생성되는 버튼 번호가 맞으면 active class 붙이기
  let loopStartNum = loopNum - pageGroupLimit + 1;
  let pageBtn = "";

  for (let i = loopStartNum <= 0 ? 1 : loopStartNum; i <= loopNum; i++) {
    pageBtn += `<button ${
      pageController.getCurrentPage() === i ? 'class="active-current-page"' : ""
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
      pageController.getCurrentPage() + 1 > pageController.getTotalPage()
        ? pageController.getCurrentPage()
        : pageController.getCurrentPage() + 1
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
      pageController.setCurrentPage(parseInt(event.target.value));
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
  pageController.setCurrentPage(1);
  pageController.setSearchKeyword(searchKeyword);
  await searchMovieFunc();
});

// movie detail btn event 등록
// onclick event
window.openDetail = (event, id) => {
  alert(`영화 id: ${id}`);
};

// 검색, 페이지 번호 눌렀을 때 결과값 처리 함수
const searchMovieFunc = async () => {
  const keyword = pageController.getSearchKeyword();
  const { results, total_pages, total_results } =
    keyword !== ""
      ? await searchMovies(
          pageController.getSearchKeyword(),
          pageController.getCurrentPage(),
        )
      : await getMovies(pageController.getCurrentPage());

  if (keyword !== "") {
    pageController.setSearchTitle(`Search Movie (총 갯수 : ${total_results})`);
  } else {
    pageController.setSearchTitle("Popular Movies");
    pageController.setMovieObject(results);
    pageController.getCurrentPage() === 1
      ? createTopMovieCard(pageController.getMovieObject())
      : "";
  }
  createPopularMovieCard(
    results,
    pageController.getSearchTitle(),
    total_pages,
    pageController.getCurrentPage(),
  );
};

// home
$homeBtn.addEventListener("click", async (event) => {
  pageController.setCurrentPage(1);
  pageController.setSearchKeyword("");
  $searchInput.value = "";
  $searchInput.focus();
  await searchMovieFunc();
});

await searchMovieFunc();
