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
  Wrapper
} from "./postUpload.styles";
import Header from "../../compoent/commons/layouts/header/Header";
import Kakaomap from "../../compoent/units/kakaomap/Kakaomap.container";
import SearchModal from "./SearchModal";
import Loading from "../../compoent/commons/loading/Loading";
import { IPostData, ISearchMapData, IUserData } from "../../api/apiType";
import UserInfo from "../../compoent/units/post/UserInfo.container";

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
  invalidPage: boolean;
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
  invalidPage
}: IProps) {
  return invalidPage ? (
    <div>이미 삭제 됬거나 유효하지 않은 게시물 입니다.</div>
  ) : (
    <>
      {(isEdit && postData.id) || !isEdit ? (
        <>
          <Header
            type='upload'
            btnText={isEdit ? "수정" : "업로드"}
            disabled={
              isEdit
                ? contentValue === "" ||
                  (postData.content === contentValue &&
                    postData.imgURL === preview &&
                    postData.rating === ratingValue &&
                    postData.mapData === selectedMapData[0])
                : !contentValue || !selectedMapData.length || !ratingValue
            }
            onSubmit={onSubmitUpload}
          />
          <Wrapper ref={wrapperRef}>
            <h2 className='a11y-hidden'>
              {isEdit ? "게시물 수정" : "게시물 작성"}
            </h2>
            <Section>
              <SectionTitle className='a11y-hidden'>유저 프로필</SectionTitle>
              <UserInfo
                userData={{ ...userData }}
                data={{ ...postData }}
                activeMoreBtn={false}
                isProfilePage={false}
              />
            </Section>

            <Section>
              <SectionTitle>맛집 선택*</SectionTitle>
              <SearchModalBtn onClick={openSearchModal}>
                맛집 검색
              </SearchModalBtn>
              <Kakaomap items={[...selectedMapData]} />
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
                placeholder='추천메뉴 / 맛 / 가격 / 팁 / 상세 위치 / 한줄 평 등'
                value={contentValue}
                onChange={onChangeContentValue}
                maxLength={1000}
                rows={1}
              />
            </Section>

            <Section>
              <SectionTitle>이미지( 최대 5개 )</SectionTitle>
              <ImgUploadBtn
                type='button'
                aria-label='이미지 업로드'
                onClick={onClickUploadImg}
              >
                이미지 업로드
              </ImgUploadBtn>
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
            accept='.jpg, .jpeg, .png, .bmp'
            className='a11y-hidden'
            onChange={onChangeImg}
            ref={hiddenUploadBtnRef}
          />
          {isOpenModal && <SearchModal closeSearchModal={closeSearchModal} />}
        </>
      ) : (
        isLoading && <Loading />
      )}
      {isLoading && <Loading />}
    </>
  );
}
