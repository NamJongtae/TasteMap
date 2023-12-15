import React from "react";
import {
  ImgBulletBtn,
  ImgBulletBtnItem,
  ImgBulletBtnList
} from "../imgSlider.styles";

interface IProps {
  imgArray: string[];
  activeButton: number;
  clickBulletBtnHandler: (idx: number) => void;
}
export default function ImgSliderBulletBtn({
  imgArray,
  activeButton,
  clickBulletBtnHandler
}: IProps) {
  return (
    <ImgBulletBtnList>
      {imgArray.map((image, idx) => {
        return (
          <ImgBulletBtnItem key={image + idx}>
            {imgArray.length > 1 && (
              <ImgBulletBtn
                className={activeButton === idx ? "active" : ""}
                onClick={() => clickBulletBtnHandler(idx)}
              >
                <span className='a11y-hidden'>이미지 슬라이드 버튼</span>
              </ImgBulletBtn>
            )}
          </ImgBulletBtnItem>
        );
      })}
    </ImgBulletBtnList>
  );
}
