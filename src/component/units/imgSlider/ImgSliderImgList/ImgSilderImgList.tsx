import React from "react";
import { ImgItem, ImgList } from "../imgSlider.styles";
import ProgressiveImg from "../../../commons/progressiveImg/ProgressiveImg";

interface IProps {
  imgArray: string[];
  imgListRef: React.RefObject<HTMLUListElement>;
}
export default function ImgSilderImgList({ imgArray, imgListRef }: IProps) {
  return (
    <ImgList ref={imgListRef}>
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
  );
}
