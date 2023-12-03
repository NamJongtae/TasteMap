import { useRef, useState } from "react";

interface IProps {
  imgArray: string[];
}

export const useImgSlider = ({ imgArray }: IProps) => {
  const [activeButton, setActiveButton] = useState(0);
  const ImgUlRef = useRef<HTMLUListElement>(null);
  // 이미지 슬라이드를 위해 해당 이미지의 이미지 크기에 인덱스를 곱해 translateX 해줌
  const sliderBtnHandler = (idx: number) => {
    if (ImgUlRef.current) {
      ImgUlRef.current.style.transform = `translateX(-${326 * idx}px)`;
      setActiveButton(idx);
    }
  };

  const prevBtnHandler = () => {
    if (ImgUlRef.current && activeButton > 0) {
      ImgUlRef.current.style.transform = `translateX(-${
        326 * (activeButton - 1)
      }px)`;
      setActiveButton((prev) => prev - 1);
    }
  };

  const nextBtnHandler = () => {
    if (ImgUlRef.current && activeButton < imgArray.length) {
      ImgUlRef.current.style.transform = `translateX(-${
        326 * (activeButton + 1)
      }px)`;
      setActiveButton((prev) => prev + 1);
    }
  };

  return {
    activeButton,
    ImgUlRef,
    sliderBtnHandler,
    prevBtnHandler,
    nextBtnHandler
  };
};
