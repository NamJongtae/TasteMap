import React from "react";
import {
  ButtonWrapper,
  CommentBtn,
  ContentText,
  ContentWrapper,
  Count,
  LikeBtn,
  MoreBtn,
  Option,
  OptionBtn,
  OptionList,
  PostDate,
  PostItemButtom,
  PostItemTop,
  UserImg,
  UserInfo,
  Username,
  Wrapper
} from "./postItem.styles";
import ImgSlider from "../imgSlider/ImgSlider";
import { resolveWebp } from "../../../library/webpSupport";
import { IPostData, IProfileData } from "../../../api/apiType";
import Kakaomap from "../kakaomap/Kakaomap";
interface IProps {
  data: IPostData;
  onClickSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isOpenSelect: boolean;
  userProfile: IProfileData;
  opectionListRef: React.RefObject<HTMLUListElement>;
  onCliceRemove: (
    e: React.MouseEvent<HTMLButtonElement>,
    data: IPostData
  ) => void;
  onClickReport: (
    e: React.MouseEvent<HTMLButtonElement>,
    postData: IPostData
  ) => void;
  isLike: boolean;
  likeCount: number | undefined;
  onClickLike: (id: string | undefined) => Promise<void>;
  onClickUserInfo: () => void;
  onClickDetailBtn: () => void;
  onClickEditBtn: () => void;
  formattedDate: string | undefined;
}

export default function PostItemUI({
  data,
  onClickSelect,
  isOpenSelect,
  userProfile,
  opectionListRef,
  onCliceRemove,
  onClickReport,
  isLike,
  likeCount,
  onClickLike,
  onClickUserInfo,
  onClickDetailBtn,
  onClickEditBtn,
  formattedDate
}: IProps) {
  return (
    <Wrapper>
      <PostItemTop>
        <UserInfo onClick={onClickUserInfo}>
          <UserImg
            src={data.photoURL}
            alt='프로필 이미지'
            onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
              (e.currentTarget.src = resolveWebp(
                "/assets/webp/icon-defaultProfile.webp",
                "svg"
              ))
            }
          />
          <Username>{data.displayName}</Username>
        </UserInfo>
        <MoreBtn type='button' aria-label='더보기' onClick={onClickSelect} />
        {isOpenSelect && (
          <>
            {data.uid === userProfile.uid ? (
              <OptionList ref={opectionListRef}>
                <Option>
                  <OptionBtn
                    className='opctionBtn'
                    type='button'
                    onClick={onClickDetailBtn}
                  >
                    상세보기
                  </OptionBtn>
                </Option>
                <Option>
                  <OptionBtn
                    className='opctionBtn'
                    type='button'
                    onClick={(e) => onCliceRemove(e, data)}
                  >
                    삭제
                  </OptionBtn>
                </Option>
                <Option>
                  <OptionBtn
                    className='opctionBtn'
                    type='button'
                    onClick={onClickEditBtn}
                  >
                    수정
                  </OptionBtn>
                </Option>
              </OptionList>
            ) : (
              <OptionList ref={opectionListRef}>
                <Option>
                  <OptionBtn
                    className='opctionBtn'
                    type='button'
                    onClick={onClickDetailBtn}
                  >
                    상세보기
                  </OptionBtn>
                </Option>
                <Option>
                  <OptionBtn
                    className='opctionBtn'
                    type='button'
                    onClick={(e) => onClickReport(e, data)}
                  >
                    신고
                  </OptionBtn>
                </Option>
              </OptionList>
            )}
          </>
        )}
      </PostItemTop>
      <ContentWrapper>
        <ContentText>{data.content}</ContentText>
        {data.thumbnailType === "map"
          ? data.mapData?.mapx && (
              <Kakaomap items={[data.mapData]} activeMouseEvent={false} />
            )
          : data.imgURL &&
            data.imgURL.length > 0 && <ImgSlider imgArray={data.imgURL} />}
      </ContentWrapper>
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
          <CommentBtn type='button' aria-label='댓글' />
          <Count>{data.commentCount}</Count>
        </ButtonWrapper>
        {data.createdAt?.seconds && (
          <PostDate
            dateTime={new Date(data.createdAt?.seconds * 1000).toISOString()}
          >
            {formattedDate}
          </PostDate>
        )}
      </PostItemButtom>
    </Wrapper>
  );
}
