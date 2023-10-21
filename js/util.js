export const makeDateForm = (min) => {
  const days = Math.floor(min / 60 / 24);
  const hour = Math.floor((min - days * 60 * 24) / 60);
  const minute = min - days * 60 * 24 - hour * 60;
  return hour + "시간" + minute + "분";
};
