/**
 * 날짜를 반환하는 함수
 * @param min
 * @returns {string}
 */
export const makeDateForm = (min) => {
  const days = Math.floor(min / 60 / 24);
  const hour = Math.floor((min - days * 60 * 24) / 60);
  const minute = min - days * 60 * 24 - hour * 60;
  return hour + "시간" + minute + "분";
};

/**
 * 평점 circle을 반환하는 함수
 * @param vote_average - 평점
 * @param type - 어디에 사용할 평점인지 구분할 수 있는 type
 * @returns {생성한 element 요소}
 */
export const makeRatingCircle = (vote_average, type) => {
  const rating = Math.ceil(vote_average * 10);
  const circleColorDeg = Math.ceil(vote_average * 36);
  const displayType =
    type === "popular" ? "popular" : type === "top" ? "other" : "modal";

  return ` <div class="circle-wrapper ${displayType}">
    <div class="circle" style="background: conic-gradient(#4cd137 ${circleColorDeg}deg, white 0deg);">
      <div class="inner-circle">
        <span>${rating}%</span>
      </div>
    </div>
  </div>`;
};
