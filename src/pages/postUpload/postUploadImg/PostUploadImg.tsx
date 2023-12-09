import React from "react";
import ScrollLoading from "../../../component/commons/loading/ScrollLoading";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Img, ImgItem, ImgList, ImgSection, ImgTitle, ImgUploadBtn, RemoveImgBtn } from '../postUpload.styles';

interface IProps {
  onClickUploadImg: () => void;
  isImgLoading: boolean;
  imgListRef: React.RefObject<HTMLUListElement>;
  preview: string[];
  onClickRemoveImg: (idx: number) => void;
}

export default function PostUploadImg({
  onClickUploadImg,
  isImgLoading,
  imgListRef,
  preview,
  onClickRemoveImg
}: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );
  return (
    <ImgSection>
      <ImgTitle>이미지( 최대 5개 )</ImgTitle>
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
    </ImgSection>
  );
}
