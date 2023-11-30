import React, { useRef, useState } from "react";
import {
  ImgBtnList,
  ImgItem,
  ImgList,
  ImgWrapper,
  ImgBtnItem,
  ImgBtn,
  PrevBtn,
  NextBtn
} from "./imgSlider.styles";
import ProgressiveImg from "../../commons/progressiveImg/ProgressiveImg";
import { useSupportedWebp } from '../../../hook/useSupportedWebp';

interface IProps {
  imgArray: string[];
}
export default function ImgSlider({ imgArray }: IProps) {
  const { isWebpSupported } = useSupportedWebp();
  const [activeButton, setActiveButton] = useState(0);
  const ImgUlRef = useRef<HTMLUListElement>(null);
  // 이미지 슬라이드를 위해 해당 이미지의 이미지 크기에 인덱스를 곱해 translateX 해줌
  const onClickSliderBtn = (idx: number) => {
    if (ImgUlRef.current) {
      ImgUlRef.current.style.transform = `translateX(-${326 * idx}px)`;
      setActiveButton(idx);
    }
  };

  const onClickPrevBtn = () => {
    if (ImgUlRef.current && activeButton > 0) {
      ImgUlRef.current.style.transform = `translateX(-${
        326 * (activeButton - 1)
      }px)`;
      setActiveButton((prev) => prev - 1);
    }
  };

  const onClickNextBtn = () => {
    if (ImgUlRef.current && activeButton < imgArray.length) {
      ImgUlRef.current.style.transform = `translateX(-${
        326 * (activeButton + 1)
      }px)`;
      setActiveButton((prev) => prev + 1);
    }
  };
  return (
    <ImgWrapper>
      {imgArray.length > 1 && (
        <PrevBtn
          type='button'
          disabled={activeButton === 0}
          onClick={onClickPrevBtn}
          $isWebpSupported={isWebpSupported}
        >
          <span className='a11y-hidden'>다음</span>
        </PrevBtn>
      )}
      <ImgList ref={ImgUlRef}>
        {imgArray.map((item, idx) => {
          return (
            <ImgItem key={item + idx}>
              <ProgressiveImg
                src={item}
                alt='게시물 이미지'
                styles={{
                  objectFit: "contain",
                  backgroundColor: "#fff",
                  verticalAlign: "top",
                  height: "100%",
                  width: "100%",
                  maxWidth: "320px",
                  maxHeight: "228px",
                  minHeight: "228px"
                }}
              />
            </ImgItem>
          );
        })}
      </ImgList>
      {imgArray.length > 1 && (
        <NextBtn
          type='button'
          disabled={activeButton === imgArray.length - 1}
          onClick={onClickNextBtn}
          $isWebpSupported={isWebpSupported}
        >
          <span className='a11y-hidden'>이전</span>
        </NextBtn>
      )}

      <ImgBtnList>
        {imgArray.map((image, idx) => {
          return (
            <ImgBtnItem key={image + idx}>
              {imgArray.length > 1 && (
                <ImgBtn
                  className={activeButton === idx ? "active" : ""}
                  onClick={() => onClickSliderBtn(idx)}
                >
                  <span className='a11y-hidden'>이미지 슬라이드 버튼</span>
                </ImgBtn>
              )}
            </ImgBtnItem>
          );
        })}
      </ImgBtnList>
    </ImgWrapper>
  );
}
