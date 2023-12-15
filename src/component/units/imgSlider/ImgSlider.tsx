import React from "react";
import { ImgSliderWrapper } from "./imgSlider.styles";
import { useImgSliderController } from "../../../hook/logic/UI/useImgSliderController";
import ImgSilderPrevBtn from "./imgSliderPrevBtn/ImgSilderPrevBtn";
import ImgSliderNextBtn from "./imgSliderNextBtn/ImgSliderNextBtn";
import ImgSilderImgList from "./ImgSliderImgList/ImgSilderImgList";
import ImgSliderBulletBtn from "./imgSliderBulletBtn/ImgSliderBulletBtn";

interface IProps {
  imgArray: string[];
}
export default function ImgSlider({ imgArray }: IProps) {
  const {
    activeButton,
    imgListRef,
    clickBulletBtnHandler,
    prevImgHandler,
    nextImgHandler
  } = useImgSliderController({ imgArray });

  return (
    <ImgSliderWrapper>
      {imgArray.length > 1 && (
        <ImgSilderPrevBtn
          disabled={activeButton === 0}
          prevImgHandler={prevImgHandler}
        />
      )}
      <ImgSilderImgList imgListRef={imgListRef} imgArray={imgArray} />
      {imgArray.length > 1 && (
        <ImgSliderNextBtn
          nextImgHandler={nextImgHandler}
          disabled={activeButton === imgArray.length - 1}
        />
      )}

      <ImgSliderBulletBtn
        imgArray={imgArray}
        activeButton={activeButton}
        clickBulletBtnHandler={clickBulletBtnHandler}
      />
    </ImgSliderWrapper>
  );
}
