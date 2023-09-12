export const setDateFormat = (dateString: Date | undefined) => {
  if(!dateString) return;
  const now = new Date();
  const dataTime = new Date(dateString);
  const diff = Math.floor((now.getTime() - dataTime.getTime()) / 1000);

  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / (60 * 60));
  const days = Math.floor(diff / (24 * 60 * 60));
  const week = Math.floor(diff / (24 * 60 * 60 * 7));

  if (diff < 60) {
    return "방금 전";
  } else if (diff < 60 * 60) {
    return `${minutes}분 전`;
  } else if (diff < 24 * 60 * 60) {
    return `${hours}시간 전`;
  } else if (diff < 24 * 60 * 60 * 7) {
    return `${days}일 전`;
  } else if (diff <= 30 * 24 * 60 * 60) {
    return `${week}주 전`;
  } else {
    return `${dataTime.getFullYear()}년 ${(
      "0" +
      (dataTime.getMonth() + 1)
    ).slice(-2)}월 ${("0" + dataTime.getDate()).slice(-2)}일`;
  }
};
