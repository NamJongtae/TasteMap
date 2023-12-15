import React from "react";
import { PrevBtn } from "../imgSlider.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

interface IProps {
  prevImgHandler: () => void;
  disabled: boolean;
}
export default function ImgSilderPrevBtn({ prevImgHandler, disabled }: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );

  return (
    <PrevBtn
      type='button'
      disabled={disabled}
      onClick={prevImgHandler}
      $isWebpSupported={isWebpSupported}
    >
      <span className='a11y-hidden'>다음</span>
    </PrevBtn>
  );
}
