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
import Header from "../../component/commons/layouts/header/Header";
import Kakaomap from "../../component/units/kakaomap/Kakaomap.container";
import SearchModal from "./SearchModal.container";
import Loading from "../../component/commons/loading/Loading";
import { IPostData, IMapData, IUserData } from "../../api/apiType";
import UserInfo from "../../component/units/post/UserInfo.container";
import ScrollLoading from "../../component/commons/loading/ScrollLoading";
import InvalidPage from "../../component/commons/invalidPage/InvalidPage";

interface IProps {
  post: IPostData;
  contentValue: string;
  selectedMapData: IMapData[];
  ratingValue: number;
  onSubmitUpload: () => Promise<void>;
  wrapperRef: React.RefObject<HTMLDivElement>;
  imgListRef: React.RefObject<HTMLUListElement>;
  myInfo: IUserData;
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
  uploadPostLoading: boolean;
  loadPostLoading: boolean;
  isImgLoading: boolean;
  isEdit: boolean;
  invalidUpdatePage: boolean;
  isWebpSupported: boolean | null;
}

export default function PostUploadUI({
  post,
  contentValue,
  selectedMapData,
  ratingValue,
  onSubmitUpload,
  wrapperRef,
  imgListRef,
  myInfo,
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
  uploadPostLoading,
  loadPostLoading,
  isImgLoading,
  isEdit,
  invalidUpdatePage,
  isWebpSupported
}: IProps) {
  if (loadPostLoading) {
    return <Loading />;
  }

  if (invalidUpdatePage) {
    return (
      <>
        <Header type='upload' btnText='수정' disabled={true} />
        <InvalidPage text='유효하지 않은 게시물입니다.' />
      </>
    );
  }

  return (
    <>
      <Header
        type='upload'
        btnText={isEdit ? "수정" : "업로드"}
        disabled={
          isEdit
            ? contentValue === "" ||
              (post.content === contentValue &&
                post.imgURL === preview &&
                post.rating === ratingValue &&
                post.mapData.address === selectedMapData[0].address)
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
            userData={{ ...myInfo }}
            data={{ ...post }}
            activeMoreBtn={false}
            postType={"HOME"}
          />
        </Section>

        <Section>
          <SectionTitle>맛집 선택*</SectionTitle>
          <SearchModalBtn
            onClick={openSearchModal}
            $isWebpSupported={isWebpSupported}
          >
            맛집 검색
          </SearchModalBtn>
          <Kakaomap items={selectedMapData} isTasteMapPage={false} />
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
      </Wrapper>

      <HiddenUploadBtn
        type='file'
        accept='.jpg, .jpeg, .png, .bmp'
        className='a11y-hidden'
        onChange={onChangeImg}
        ref={hiddenUploadBtnRef}
      />
      {isOpenModal && <SearchModal closeSearchModal={closeSearchModal} />}
      {uploadPostLoading && <Loading />}
    </>
  );
}
