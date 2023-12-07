import React from "react";
import { useOpenCommentModal } from "../../../../../hook/logic/post/postItem/useOpenCommentModal";
import { usePostLike } from "../../../../../hook/logic/post/postItem/usePostLike";
import { setDateFormat } from "../../../../../library/setDateFormat";
import { IMyProfileData, IPostData } from "../../../../../api/apiType";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import {
  ButtonWrapper,
  CommentBtn,
  Count,
  LikeBtn,
  PostDate,
  PostItemBottomWrapper
} from "../postItem.styles";

interface IProps {
  data: IPostData;
  myProfile: IMyProfileData;
  postType: "HOME" | "FEED" | "PROFILE";
}

export default function PostBottom({ data, myProfile, postType }: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );

  const { isLike, likeCount, toggleLikeHandler } = usePostLike({
    data,
    myProfile,
    postType
  });

  const openCommentModalHanlder = useOpenCommentModal(data.id);

  return (
    <PostItemBottomWrapper>
      <ButtonWrapper>
        <LikeBtn
          type='button'
          aria-label='좋아요'
          onClick={() => toggleLikeHandler(data.id)}
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
          dateTime={new Date(data.createdAt?.seconds * 1000).toISOString()}
        >
          {setDateFormat(data.createdAt?.seconds * 1000)}
        </PostDate>
      )}
    </PostItemBottomWrapper>
  );
}
