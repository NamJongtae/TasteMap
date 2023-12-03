import { useEffect, useState } from "react";

export const useLoading = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // 로딩 gif 이미지 로딩 상태를 확인하고 이미지가 로딩 완료되면 상태를 변경합니다.
  useEffect(() => {
    const img = new Image();
    img.src = "/assets/spinner.gif";
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  return { imageLoaded };
};
