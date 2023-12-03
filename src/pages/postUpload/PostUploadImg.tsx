import React from "react";
import {
  Img,
  ImgItem,
  ImgList,
  ImgUploadBtn,
  RemoveImgBtn,
  Section,
  SectionTitle
} from "./postUpload.styles";
import ScrollLoading from "../../component/commons/loading/ScrollLoading";
import { useSupportedWebp } from "../../hook/useSupportedWebp";

interface IProps {
  onClickUploadImg: () => void;
  isImgLoading: boolean;
  imgListRef: React.RefObject<HTMLUListElement>;
  preview: string[];
  onClickRemoveImg:  (idx: number) => void;
}

export default function PostUploadImg({
  onClickUploadImg,
  isImgLoading,
  imgListRef,
  preview,
  onClickRemoveImg
}: IProps) {
  const { isWebpSupported } = useSupportedWebp();
  return (
    <Section>
      <SectionTitle>이미지( 최대 5개 )</SectionTitle>
      <ImgUploadBtn
        type='button'
        aria-label='이미지 업로드'
        onClick={onClickUploadImg}
        $isWebpSupported={isWebpSupported}
      >
        이미지 업로드
      </ImgUploadBtn>
      {isImgLoading ? (
        <ScrollLoading />
      ) : (
        <ImgList ref={imgListRef}>
          {preview.map((item, idx) => {
            return (
              <ImgItem key={item}>
                <Img src={item} alt='업로드 이미지' />
                <RemoveImgBtn
                  type='button'
                  onClick={() => onClickRemoveImg(idx)}
                  $isWebpSupported={isWebpSupported}
                />
              </ImgItem>
            );
          })}
        </ImgList>
      )}
    </Section>
  );
}
