export class Pagination {
  constructor(
    totalPage = 1,
    currentPageGroup = 1,
    currentPage = 1,
    searchKeyword = "",
    movieObject = null,
    pageGroupLimit = 5,
  ) {
    this._currentPageGroup = currentPageGroup;
    this._currentPage = currentPage;
    this._searchKeyword = searchKeyword;
    this._pageGroupLimit = pageGroupLimit;
    this._movieObject = movieObject;
    this._printTitle = "";
    this._totalPage = totalPage;
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
    this._searchKeyword = value.replaceAll(" ", "") === "" ? "" : value;
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
