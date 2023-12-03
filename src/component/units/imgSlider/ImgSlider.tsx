import React from "react";
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
import { useSupportedWebp } from "../../../hook/useSupportedWebp";
import { useImgSlider } from "../../../hook/logic/UI/useImgSlider";

interface IProps {
  imgArray: string[];
}
export default function ImgSlider({ imgArray }: IProps) {
  const { isWebpSupported } = useSupportedWebp();
  const {
    activeButton,
    ImgUlRef,
    sliderBtnHandler,
    prevBtnHandler,
    nextBtnHandler
  } = useImgSlider({ imgArray });

  return (
    <ImgWrapper>
      {imgArray.length > 1 && (
        <PrevBtn
          type='button'
          disabled={activeButton === 0}
          onClick={prevBtnHandler}
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
          onClick={nextBtnHandler}
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
                  onClick={() => sliderBtnHandler(idx)}
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
