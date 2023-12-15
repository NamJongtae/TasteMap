import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { NextBtn } from "../imgSlider.styles";

interface IProps {
  nextImgHandler: () => void;
  disabled: boolean;
}
export default function ImgSliderNextBtn({ nextImgHandler, disabled }: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );

  return (
    <NextBtn
      type='button'
      disabled={disabled}
      onClick={nextImgHandler}
      $isWebpSupported={isWebpSupported}
    >
      <span className='a11y-hidden'>이전</span>
    </NextBtn>
  );
}
