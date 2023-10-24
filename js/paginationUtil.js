const calLoopNum = (pageGroupLimit, currentPageGroup, totalPage) => {
  return pageGroupLimit * currentPageGroup > totalPage
    ? totalPage
    : pageGroupLimit * currentPageGroup;
};

export class Pagination {
  constructor(
    totalPage = 1,
    currentPageGroup = 1,
    currentPage = 1,
    searchKeyword = '',
    movieObject = null,
    pageGroupLimit = 5,
    loopNum = 1,
    loopStartNum = 1,
  ) {
    this._currentPageGroup = currentPageGroup;
    this._currentPage = currentPage;
    this._searchKeyword = searchKeyword;
    this._pageGroupLimit = pageGroupLimit;
    this._movieObject = movieObject;
    this._printTitle = '';
    this._totalPage = totalPage;
    this._loopNum = loopNum;
    this._loopStartNum = loopStartNum;
  }

  get loopStartNum() {
    this._loopStartNum = this._loopNum - this.pageGroupLimit + 1;
    console.log(this._loopStartNum);
    return this._loopStartNum;
  }

  set loopStartNum(value) {
    this._loopStartNum = value;
  }

  get loopNum() {
    this._loopNum = calLoopNum(
      this._pageGroupLimit,
      this._currentPageGroup,
      this._totalPage,
    );
    return this._loopNum;
  }

  set loopNum(value) {
    this._loopNum = value;
  }

  get totalPage() {
    return this._totalPage;
  }

  set totalPage(value) {
    this._totalPage = value <= 0 ? 1 : value;
  }

  get currentPageGroup() {
    return this._currentPageGroup;
  }

  set currentPageGroup(value) {
    this._currentPageGroup = Math.ceil(
      this._currentPage / this._pageGroupLimit,
    );
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(value) {
    if (value > 500) {
      value = 500;
    }

    this._currentPage = value <= 0 ? 1 : value;
  }

  get searchKeyword() {
    return this._searchKeyword;
  }

  set searchKeyword(value) {
    this._searchKeyword = value.replaceAll(' ', '') === '' ? '' : value;
  }

  get printTitle() {
    return this._printTitle;
  }

  set printTitle(value) {
    this._printTitle = value;
  }

  get pageGroupLimit() {
    return this._pageGroupLimit;
  }

  set pageGroupLimit(value) {
    this._pageGroupLimit = value;
  }

  get movieObject() {
    return this._movieObject;
  }

  set movieObject(value) {
    this._movieObject = value.reduce(
      (acc, cur, index) => {
        if (index < 5) {
          acc.topFive.push(cur);
        }
        acc.popular.push(cur);
        return acc;
      },
      { topFive: [], popular: [] },
    );
  }
}

/**
 * pagination 생성 함수
 * @param pageObject - pagination object
 */
export const createPagination = (pageObject) => {
  // 생성한 pagination 넣을 부모 tag
  const $footer = document.querySelector('.footer-wrapper');
  // footer 초기화
  $footer.innerHTML = '';
  pageObject.currentPageGroup = '';
  const currentPageGroup = pageObject.currentPageGroup;
  // 현재 pagination group의 limit 호출
  const totalPage = pageObject.totalPage;
  const currentPage = pageObject.currentPage;

  // 상위 nav tag 생성
  const $paginationNav = document.createElement('nav');
  $paginationNav.classList.add('footer-nav');
  // 이전 화살표 그룹 div tag 생성
  const prevBtnGroup = document.createElement('div');
  prevBtnGroup.classList.add('prev__btn-group');
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
  $paginationNav.append(prevBtnGroup);

  // page 숫자 버튼 그룹 생성
  const $pageBtnGroup = document.createElement('div');
  $pageBtnGroup.classList.add('page__btn-group');
  // pagination 버튼 그룹 limit만큼 반복문을 돌며 버튼 생성
  // 반복횟수 정하기
  const loopNum = pageObject.loopNum;
  const loopStartNum = pageObject.loopStartNum;
  let pageBtn = '';

  // 현재 page 번호와 생성되는 버튼 번호가 맞으면 active class 붙이기
  for (let i = loopStartNum <= 0 ? 1 : loopStartNum; i <= loopNum; i++) {
    pageBtn += `<button ${
      pageObject.currentPage === i ? 'class="active-current-page"' : ''
    } value="${i}"><span>${i}</span></button>`;
  }
  // 생성된 button 그룹에 innderHTML
  $pageBtnGroup.innerHTML = pageBtn;
  // 완성된 pageBtnGroup nav에 append
  $paginationNav.append($pageBtnGroup);

  // 다음 화살표 그룹 div tag 생성
  const $nextBtnGroup = document.createElement('div');
  $nextBtnGroup.classList.add('next__btn-group');
  $nextBtnGroup.innerHTML = `
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
  $paginationNav.append($nextBtnGroup);
  // 완성된 nav footer에 append
  $footer.append($paginationNav);
};
