import React from "react";
import {
  HiddenUploadBtn,
  Img,
  ImgItem,
  ImgList,
  ImgUploadBtn,
  KaKaoMapWrapper,
  Rating,
  RatingCount,
  RatingTag,
  RatingWrapper,
  RemoveImgBtn,
  SearchModalBtn,
  TextArea,
  UserImg,
  UserInfo,
  UserName,
  Wrapper
} from "./postUpload.styles";
import Header from "../../compoent/commons/layouts/header/Header";
import Kakaomap from "../../compoent/units/kakaomap/Kakaomap";
import SearchModal from "./SearchModal";
import Loading from "../../compoent/commons/loading/Loading";
import { resolveWebp } from "../../library/webpSupport";
import { ISearchMapData, IUserData } from "../../api/apiType";

interface IProps {
  contentValue: string;
  selectedMapData: ISearchMapData[];
  ratingValue: number;
  onSubmitUpload: () => Promise<void>;
  wrapperRef: React.RefObject<HTMLDivElement>;
  userData: IUserData;
  openSearchModal: () => void;
  setRatingValue: React.Dispatch<React.SetStateAction<number>>;
  onChangeContentValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  preview: string[];
  onClickRemoveImg: (idx: number) => void;
  onChangeImg: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  hiddenUploadBtnRef: React.RefObject<HTMLInputElement>;
  onClickUploadImg: () => void;
  closeSearchModal: () => void;
  isOpenModal: boolean;
  isLoading: boolean;
}

export default function PostUploadUI({
  contentValue,
  selectedMapData,
  ratingValue,
  onSubmitUpload,
  wrapperRef,
  userData,
  openSearchModal,
  setRatingValue,
  onChangeContentValue,
  preview,
  onClickRemoveImg,
  onChangeImg,
  hiddenUploadBtnRef,
  onClickUploadImg,
  closeSearchModal,
  isOpenModal,
  isLoading
}: IProps) {
  return (
    <>
      <Header
        type='upload'
        btnText='업로드'
        disabled={!contentValue || !selectedMapData.length || !ratingValue}
        onSubmit={onSubmitUpload}
      />
      <Wrapper ref={wrapperRef}>
        <UserInfo>
          <UserImg
            src={
              userData.photoURL ||
              resolveWebp("assets/webp/icon-defaultProfile.webp", "svg")
            }
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              (e.currentTarget.src = resolveWebp(
                "assets/webp/icon-defaultProfile.webp",
                "svg"
              ))
            }
          />
          <UserName>{userData.displayName}</UserName>
        </UserInfo>
        <KaKaoMapWrapper>
          <SearchModalBtn onClick={openSearchModal}>맛집 검색</SearchModalBtn>
          <Kakaomap items={selectedMapData} />
        </KaKaoMapWrapper>
        <RatingWrapper>
          <RatingTag className='a11y-hidden'>평점 </RatingTag>
          <Rating
            count={5}
            value={ratingValue}
            onChange={(value) => setRatingValue(value)}
            allowHalf
            autoFocus
          />
          <RatingCount>{ratingValue}</RatingCount>
        </RatingWrapper>
        <TextArea
          placeholder='맛집을 소개해주세요.'
          value={contentValue}
          onChange={onChangeContentValue}
          maxLength={1000}
        />
        <ImgList>
          {preview.map((item, idx) => {
            return (
              <ImgItem key={item}>
                <Img src={item} alt='업로드 이미지' />
                <RemoveImgBtn
                  type='button'
                  onClick={() => onClickRemoveImg(idx)}
                />
              </ImgItem>
            );
          })}
        </ImgList>
      </Wrapper>
      <HiddenUploadBtn
        type='file'
        className='a11y-hidden'
        onChange={onChangeImg}
        ref={hiddenUploadBtnRef}
      />
      <ImgUploadBtn
        type='button'
        aria-label='이미지 업로드'
        onClick={onClickUploadImg}
      />
      {isOpenModal && <SearchModal closeSearchModal={closeSearchModal} />}

      {isLoading && <Loading />}
    </>
  );
}
