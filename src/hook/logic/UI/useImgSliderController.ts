import { useRef, useState } from "react";

interface IProps {
  imgArray: string[];
}

export const useImgSliderController = ({ imgArray }: IProps) => {
  const [activeButton, setActiveButton] = useState(0);
  const imgListRef = useRef<HTMLUListElement>(null);
  // 이미지 슬라이드를 위해 해당 이미지의 이미지 크기에 인덱스를 곱해 translateX 해줌
  const clickBulletBtnHandler = (idx: number) => {
    if (imgListRef.current) {
      imgListRef.current.style.transform = `translateX(-${326 * idx}px)`;
      setActiveButton(idx);
    }
  };

  const prevImgHandler = () => {
    if (imgListRef.current && activeButton > 0) {
      imgListRef.current.style.transform = `translateX(-${
        326 * (activeButton - 1)
      }px)`;
      setActiveButton((prev) => prev - 1);
    }
  };

  const nextImgHandler = () => {
    if (imgListRef.current && activeButton < imgArray.length) {
      imgListRef.current.style.transform = `translateX(-${
        326 * (activeButton + 1)
      }px)`;
      setActiveButton((prev) => prev + 1);
    }
  };

  return {
    activeButton,
    imgListRef,
    clickBulletBtnHandler,
    prevImgHandler,
    nextImgHandler
  };
};
