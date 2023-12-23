import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { ActiveImageBtn, ActiveMapBtn } from "../../postList/post.styles";

interface IProps {
  contentType: "MAP" | "IMAGE";
  changeImgTypeHandler: () => void;
  changeMapTypeHandler: (imgURL: string[]) => void;
  imgURL: string[];
}
export default function ContentTypeBtns({
  contentType,
  changeImgTypeHandler,
  changeMapTypeHandler,
  imgURL
}: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );
  return (
    <>
      <ActiveMapBtn
        type='button'
        contentType={contentType}
        onClick={changeImgTypeHandler}
        aria-label='지도'
        $isWebpSupported={isWebpSupported}
      />
      <ActiveImageBtn
        type='button'
        contentType={contentType}
        onClick={() => changeMapTypeHandler(imgURL)}
        aria-label='이미지'
        $isWebpSupported={isWebpSupported}
      />
    </>
  );
}
