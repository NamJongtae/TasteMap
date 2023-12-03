import React from "react";
import { IPostData, IMyProfileData } from "../../../api/apiType";
import { useSupportedWebp } from "../../../hook/useSupportedWebp";
import { usePostItem } from "../../../hook/logic/post/usePostItem";
import ImgSlider from "../imgSlider/ImgSlider";
import Kakaomap from "../kakaomap/Kakaomap";
import UserInfo from "./UserInfo";
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
  ContentTextLine,
  Placeholder
} from "./postItem.styles";

interface IProps {
  data: IPostData;
  myProfile: IMyProfileData;
  postType: "HOME" | "FEED" | "PROFILE";
}

export const enum EContentType {
  MAP = "MAP",
  IMAGE = "IMAGE"
}

export default function PostItem({ data, myProfile, postType }: IProps) {
  const { isWebpSupported } = useSupportedWebp();
  const {
    isLike,
    likeCount,
    addLikeHandler,
    removeLikeHandler,
    isStoredMap,
    toggleMapHandler,
    getFormattedDate,
    changeMapTypeHandler,
    changeImgTypeHandler,
    contentType,
    openMoreTextHandler,
    contentTextRef,
    isShowMoreTextBtn,
    openCommentModalHanlder,
    kakaomapRef,
    inview
  } = usePostItem({ data, myProfile, postType });
  return (
    <>
      {myProfile.uid && (
        <Wrapper>
          <h2 className='a11y-hidden'>홈</h2>
          <UserInfoWrapper>
            <h3 className='a11y-hidden'>유저 프로필</h3>
            <UserInfo
              userData={{
                ...myProfile
              }}
              data={{ ...data }}
              activeMoreBtn={true}
              postType={postType}
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
                  onClick={openMoreTextHandler}
                  aria-label='더보기'
                  $isWebpSupported={isWebpSupported}
                >
                  더보기
                </MoreContentBtn>
              </>
            )}

            <KakaoMapWrapper contentType={contentType} ref={kakaomapRef}>
              {contentType === EContentType.MAP && (
                <StoredMapBtn
                  type='button'
                  aria-label={isStoredMap ? "맛집 삭제" : "맛집 추가"}
                  storedMap={isStoredMap}
                  onClick={() => toggleMapHandler(data)}
                  title={isStoredMap ? "맛집 삭제" : "맛집 추가"}
                  $isWebpSupported={isWebpSupported}
                />
              )}
              <h3 className='a11y-hidden'>
                {contentType === EContentType.MAP ? "지도" : "이미지"}
              </h3>
              {contentType === EContentType.MAP
                ? data.mapData?.mapx &&
                  (inview ? (
                    <Kakaomap
                      items={[{ ...data.mapData }]}
                      isTasteMapPage={false}
                    />
                  ) : (
                    <Placeholder></Placeholder>
                  ))
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
            contentType={contentType}
            onClick={changeImgTypeHandler}
            aria-label='지도'
            $isWebpSupported={isWebpSupported}
          />
          <ActiveImageBtn
            type='button'
            contentType={contentType}
            onClick={changeMapTypeHandler}
            aria-label='이미지'
            $isWebpSupported={isWebpSupported}
          />
          <PostItemButtom>
            <ButtonWrapper>
              <LikeBtn
                type='button'
                aria-label='좋아요'
                onClick={() =>
                  isLike ? removeLikeHandler(data.id) : addLikeHandler(data.id)
                }
                like={isLike}
                $isWebpSupported={isWebpSupported}
              />
              <Count>{likeCount}</Count>
            </ButtonWrapper>
            <ButtonWrapper>
              <CommentBtn
                type='button'
                aria-label='댓글'
                onClick={openCommentModalHanlder}
                $isWebpSupported={isWebpSupported}
              />
              <Count>{data.commentCount}</Count>
            </ButtonWrapper>
            {data.createdAt?.seconds && (
              <PostDate
                dateTime={new Date(
                  data.createdAt?.seconds * 1000
                ).toISOString()}
              >
                {getFormattedDate}
              </PostDate>
            )}
          </PostItemButtom>
        </Wrapper>
      )}
    </>
  );
}
