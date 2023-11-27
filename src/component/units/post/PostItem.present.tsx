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
  ContentTextLine,
  Placeholder
} from "./postItem.styles";
import ImgSlider from "../imgSlider/ImgSlider";
import { IPostData, IMyProfileData } from "../../../api/apiType";
import Kakaomap from "../kakaomap/Kakaomap.container";
import UserInfo from "./UserInfo.container";
import { EContentType } from "./PostItem.container";
interface IProps {
  data: IPostData;
  myProfile: IMyProfileData;
  isLike: boolean;
  likeCount: number | undefined;
  onClickLike: (id: string | undefined) => Promise<void>;
  isStoredMap: boolean;
  onClickStoredMap: (postData: IPostData) => void;
  formattedDate: string | undefined;
  changePostMapType: () => void;
  changePostImgType: () => void;
  contentType: EContentType;
  onClickMoreText: () => void;
  contentTextRef: React.RefObject<HTMLParagraphElement>;
  isShowMoreTextBtn: boolean;
  openCommentModal: () => void;
  kakaomapRef: (node?: Element | null | undefined) => void;
  inview: boolean;
  postType: "HOME" | "FEED" | "PROFILE";
}

export default function PostItemUI({
  data,
  isLike,
  likeCount,
  isStoredMap,
  onClickStoredMap,
  onClickLike,
  formattedDate,
  myProfile,
  changePostMapType,
  changePostImgType,
  contentType,
  onClickMoreText,
  contentTextRef,
  isShowMoreTextBtn,
  openCommentModal,
  kakaomapRef,
  inview,
  postType
}: IProps) {
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
                  onClick={onClickMoreText}
                  aria-label='더보기'
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
                  onClick={() => onClickStoredMap(data)}
                  title={isStoredMap ? "맛집 삭제" : "맛집 추가"}
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
            onClick={changePostImgType}
            aria-label='지도'
          />
          <ActiveImageBtn
            type='button'
            contentType={contentType}
            onClick={changePostMapType}
            aria-label='이미지'
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
