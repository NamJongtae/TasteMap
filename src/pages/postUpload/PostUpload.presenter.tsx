import React from "react";
import {
  HiddenUploadBtn,
  Img,
  ImgItem,
  ImgList,
  ImgUploadBtn,
  Rating,
  RatingCount,
  RatingWrapper,
  RemoveImgBtn,
  SearchModalBtn,
  Section,
  SectionTitle,
  TextArea,
  ThumbnailSelectBtn,
  ThumbnailSelectLabel,
  UserImg,
  UserName,
  Wrapper
} from "./postUpload.styles";
import Header from "../../compoent/commons/layouts/header/Header";
import Kakaomap from "../../compoent/units/kakaomap/Kakaomap";
import SearchModal from "./SearchModal";
import Loading from "../../compoent/commons/loading/Loading";
import { resolveWebp } from "../../library/webpSupport";
import { IPostData, ISearchMapData, IUserData } from "../../api/apiType";

interface IProps {
  postData: IPostData;
  contentValue: string;
  selectedMapData: ISearchMapData[];
  ratingValue: number;
  onSubmitUpload: () => Promise<void>;
  wrapperRef: React.RefObject<HTMLDivElement>;
  userData: IUserData;
  openSearchModal: () => void;
  setRatingValue: React.Dispatch<React.SetStateAction<number>>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  handleResizeHeight: () => void;
  onChangeContentValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  preview: string[];
  onClickRemoveImg: (idx: number) => void;
  onChangeImg: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  hiddenUploadBtnRef: React.RefObject<HTMLInputElement>;
  onClickUploadImg: () => void;
  closeSearchModal: () => void;
  isOpenModal: boolean;
  isLoading: boolean;
  isEdit: boolean;
  thumbnailType: string;
  onChangeTumbnailType: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PostUploadUI({
  postData,
  contentValue,
  selectedMapData,
  ratingValue,
  onSubmitUpload,
  wrapperRef,
  userData,
  openSearchModal,
  setRatingValue,
  textareaRef,
  onChangeContentValue,
  preview,
  onClickRemoveImg,
  onChangeImg,
  hiddenUploadBtnRef,
  onClickUploadImg,
  closeSearchModal,
  isOpenModal,
  isLoading,
  isEdit,
  thumbnailType,
  onChangeTumbnailType
}: IProps) {
  return (
    <>
      <Header
        type='upload'
        btnText={isEdit ? "수정" : "업로드"}
        disabled={
          isEdit
            ? (thumbnailType === "image" ? preview.length === 0 : false) ||
              contentValue === "" ||
              (postData.content === contentValue &&
                postData.imgURL === preview &&
                postData.rating === ratingValue &&
                postData.thumbnailType === thumbnailType &&
                postData.mapData === selectedMapData[0])
            : !contentValue ||
              !selectedMapData.length ||
              !ratingValue ||
              !thumbnailType
        }
        onSubmit={onSubmitUpload}
      />
      <Wrapper ref={wrapperRef}>
        <h2 className='a11y-hidden'>맛집 소개하기</h2>
        <Section>
          <SectionTitle className='a11y-hidden'>유저정보</SectionTitle>
          <UserImg
            src={
              userData.photoURL ||
              resolveWebp("assets/webp/icon-defaultProfile.webp", "svg")
            }
            alt='프로필 이미지'
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              (e.currentTarget.src = resolveWebp(
                "assets/webp/icon-defaultProfile.webp",
                "svg"
              ))
            }
          />
          <UserName>{userData.displayName}</UserName>
        </Section>
        <Section>
          <SectionTitle>썸네일 종류* ( 지도 / 이미지 )</SectionTitle>
          <ThumbnailSelectLabel thumbnailType={thumbnailType} className='map'>
            <span className='a11y-hidden'>지도</span>
            <ThumbnailSelectBtn
              className='a11y-hidden'
              type='radio'
              name='thumbnail_type_group'
              checked={thumbnailType === "map"}
              value={"map"}
              onChange={(e) => onChangeTumbnailType(e)}
            />
          </ThumbnailSelectLabel>
          <ThumbnailSelectLabel thumbnailType={thumbnailType} className='img'>
            <span className='a11y-hidden'>이미지</span>
            <ThumbnailSelectBtn
              className='a11y-hidden'
              type='radio'
              name='thumbnail_type_group'
              checked={thumbnailType === "image"}
              value={"image"}
              onChange={(e) => onChangeTumbnailType(e)}
            />
          </ThumbnailSelectLabel>
        </Section>

        <Section>
          <SectionTitle>맛집 선택*</SectionTitle>
          <SearchModalBtn onClick={openSearchModal}>맛집 검색</SearchModalBtn>
          <Kakaomap items={selectedMapData} activeMouseEvent={true} />
        </Section>
        <Section>
          <SectionTitle>평점*</SectionTitle>
          <RatingWrapper>
            <Rating
              count={5}
              value={ratingValue}
              onChange={(value) => setRatingValue(value)}
              allowHalf
              autoFocus
            />
            {ratingValue !== 0 && <RatingCount>{ratingValue}</RatingCount>}
          </RatingWrapper>
        </Section>

        <Section>
          <SectionTitle>소개 내용*</SectionTitle>
          <TextArea
            ref={textareaRef}
            placeholder='맛 / 추천메뉴 / 가격 / 서비스 / 팁 / 상세 위치 등'
            value={contentValue}
            onChange={onChangeContentValue}
            maxLength={1000}
          />
        </Section>

        <Section>
          <SectionTitle>
            이미지{thumbnailType === "image" ? "*" : ""} ( 최대 5개 )
          </SectionTitle>
          <ImgUploadBtn
            type='button'
            aria-label='이미지 업로드'
            onClick={onClickUploadImg}
          >이미지 업로드</ImgUploadBtn>
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
        </Section>
      </Wrapper>
      <HiddenUploadBtn
        type='file'
        accept='.jpg, .jpeg, .svg, .png' 
        className='a11y-hidden'
        onChange={onChangeImg}
        ref={hiddenUploadBtnRef}
      />
      {isOpenModal && <SearchModal closeSearchModal={closeSearchModal} />}
      {isLoading && <Loading />}
    </>
  );
}
