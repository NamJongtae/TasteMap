interface IProps {
  myMap: any;
}
export const useZoomController = ({ myMap }: IProps) => {
  // 지도 레벨은 지도의 확대 수준을 의미
  const zoomIn = () => {
    // 현재 지도의 레벨을 얻어옵니다
    const level = myMap.getLevel();

    // 지도를 1레벨 내림 (지도가 확대)
    myMap.setLevel(level - 1);
  };

  const zoomOut = () => {
    // 현재 지도의 레벨을 얻어옵니다
    const level = myMap.getLevel();

    // 지도를 1레벨 올림 (지도가 축소)
    myMap.setLevel(level + 1);
  };

  return { zoomIn, zoomOut };
};
