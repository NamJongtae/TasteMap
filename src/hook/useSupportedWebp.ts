import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { settingSlice } from "../slice/settingSlice";
import { useEffect } from "react";

export const useSupportedWebp = () => {
  const disaptch = useDispatch<AppDispatch>();
  // webp 지원여부
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );
  useEffect(() => {
    // webp 지원여부 값이 없는 경우에만 실행
    if (isWebpSupported === null) {
      const image = new Image();
      // 1px x 1px WebP 이미지
      const webpdata =
        "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";

      const callback = (event: Event | string) => {
        if (typeof event === "string") {
          return console.error(event);
        }
        // event.type이 "load"인 경우와 이미지의 너비(image.width)가 1 픽셀인 경우를 검사하여 브라우저가 WebP 이미지를 지원하는지 여부를 판별
        const result = event?.type === "load" && image.width === 1;
        if (result) {
          disaptch(settingSlice.actions.setIsWebpSupproted(true));
        } else {
          disaptch(settingSlice.actions.setIsWebpSupproted(false));
        }
        localStorage.setItem("webpSupported", JSON.stringify(result));
      };

      image.onerror = callback;
      image.onload = callback;
      image.src = webpdata;
    }
  }, [isWebpSupported]);

  return { isWebpSupported };
};
