import { useCallback, useLayoutEffect, useRef, useState } from "react";

export const usePostMoreTextBtn = () => {
  const [isShowMoreTextBtn, setIsShowMoreTextBtn] = useState(false);
  const contentTextRef = useRef<HTMLParagraphElement>(null);

  const openMoreTextHandler = useCallback(() => {
    if (contentTextRef.current) {
      contentTextRef.current.style.display = "block";
      setIsShowMoreTextBtn(false);
    }
  }, []);

  useLayoutEffect(() => {
    if (contentTextRef.current) {
      if (contentTextRef.current.clientHeight >= 105) {
        setIsShowMoreTextBtn(true);
      } else {
        setIsShowMoreTextBtn(false);
      }
    }
  }, []);

  return { isShowMoreTextBtn, contentTextRef, openMoreTextHandler };
};
