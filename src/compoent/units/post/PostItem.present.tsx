import React from "react";
import {
  ButtonWrapper,
  CommentBtn,
  ContentText,
  ContentWrapper,
  Count,
  LikeBtn,
  Rating,
  PostDate,
  PostItemButtom,
  RatingCount,
  RatingWrapper,
  Wrapper,
  UserInfoWrapper,
  KakaoMapWrapper,
  ActiveMapBtn,
  ActiveImageBtn,
  StoredMapBtn,
  MoreContentBtn,
  ContentTextLine
} from "./postItem.styles";
import ImgSlider from "../imgSlider/ImgSlider";
import { IPostData, IProfileData } from "../../../api/apiType";
import Kakaomap from "../kakaomap/Kakaomap.container";
import UserInfo from "./UserInfo.container";
interface IProps {
  data: IPostData;
  myProfileData: IProfileData;
  isLike: boolean;
  likeCount: number | undefined;
  onClickLike: (id: string | undefined) => Promise<void>;
  isStoredMap: boolean;
  onClickStoredMap: (postData: IPostData) => void;
  formattedDate: string | undefined;
  changePostMapType: () => void;
  changePostImgType: () => void;
  postType: "map" | "image";
  onClickMoreText: () => void;
  contentTextRef: React.RefObject<HTMLParagraphElement>;
  isShowMoreTextBtn: boolean;
  openCommentModal: () => void;
  isProfilePage: boolean;
}

export default function PostItemUI({
  data,
  isLike,
  likeCount,
  isStoredMap,
  onClickStoredMap,
  onClickLike,
  formattedDate,
  myProfileData,
  changePostMapType,
  changePostImgType,
  postType,
  onClickMoreText,
  contentTextRef,
  isShowMoreTextBtn,
  openCommentModal,
  isProfilePage
}: IProps) {
  return (
    <>
      {myProfileData.uid && (
        <Wrapper>
          <h2 className='a11y-hidden'>홈</h2>
          <UserInfoWrapper>
            <h3 className='a11y-hidden'>유저 프로필</h3>
            <UserInfo
              userData={{
                ...myProfileData
              }}
              data={{ ...data }}
              activeMoreBtn={true}
              isProfilePage={isProfilePage}
            />
          </UserInfoWrapper>
          <ContentWrapper>
            <h3 className='a11y-hidden'>내용</h3>
            <ContentText ref={contentTextRef}>{data.content}</ContentText>

            {isShowMoreTextBtn && (
              <>
                <ContentTextLine></ContentTextLine>
                <MoreContentBtn
                  type='button'
                  onClick={onClickMoreText}
                  aria-label='더보기'
                >
                  더보기
                </MoreContentBtn>
              </>
            )}
            <KakaoMapWrapper postType={postType}>
              {postType === "map" && (
                <StoredMapBtn
                  type='button'
                  storedMap={isStoredMap}
                  onClick={() => onClickStoredMap(data)}
                  title={isStoredMap ? "맛집 삭제" : "맛집 추가"}
                />
              )}
              <h3 className='a11y-hidden'>
                {postType === "map" ? "지도" : "이미지"}
              </h3>
              {postType === "map"
                ? data.mapData?.mapx && (
                    <Kakaomap items={[{ ...data.mapData }]} isTasteMapPage={false}/>
                  )
                : data.imgURL &&
                  data.imgURL.length > 0 && (
                    <ImgSlider imgArray={data.imgURL} />
                  )}
            </KakaoMapWrapper>
            <RatingWrapper>
              <h3 className='a11y-hidden'>평점</h3>
              <Rating value={data.rating} disabled={true} allowHalf />{" "}
              <RatingCount>{data.rating}</RatingCount>
            </RatingWrapper>
          </ContentWrapper>
          <ActiveMapBtn
            type='button'
            postType={postType}
            onClick={changePostImgType}
          />
          <ActiveImageBtn
            type='button'
            postType={postType}
            onClick={changePostMapType}
          />
          <PostItemButtom>
            <ButtonWrapper>
              <LikeBtn
                type='button'
                aria-label='좋아요'
                onClick={() => onClickLike(data.id)}
                like={isLike}
              />
              <Count>{likeCount}</Count>
            </ButtonWrapper>
            <ButtonWrapper>
              <CommentBtn
                type='button'
                aria-label='댓글'
                onClick={openCommentModal}
              />
              <Count>{data.commentCount}</Count>
            </ButtonWrapper>
            {data.createdAt?.seconds && (
              <PostDate
                dateTime={new Date(
                  data.createdAt?.seconds * 1000
                ).toISOString()}
              >
                {formattedDate}
              </PostDate>
            )}
          </PostItemButtom>
        </Wrapper>
      )}
    </>
  );
}
