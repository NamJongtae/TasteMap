import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import { usePostLike } from "../../../../../../hook/logic/post/postItem/usePostLike";
import { IMyProfileData, IPostData } from "../../../../../../api/apiType";
import { ButtonWrapper, Count, LikeBtn } from "../../../postList/post.styles";

interface IProps {
  data: IPostData;
  myProfile: IMyProfileData;
  postType: "HOME" | "FEED" | "PROFILE";
}
export default function PostLikeBtn({ data, myProfile, postType }: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );

  const { isLike, likeCount, toggleLikeHandler } = usePostLike({
    data,
    myProfile,
    postType
  });

  return (
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
  );
}
