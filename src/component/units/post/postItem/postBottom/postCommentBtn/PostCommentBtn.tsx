import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import { useOpenCommentModal } from "../../../../../../hook/logic/post/postItem/useOpenCommentModal";
import {
  ButtonWrapper,
  CommentBtn,
  Count
} from "../../../postList/post.styles";

interface IProps {
  commentCount: number;
  postId: string;
}

export default function PostCommentBtn({ commentCount, postId }: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );

  const openCommentModalHanlder = useOpenCommentModal(postId);

  return (
    <ButtonWrapper>
      <CommentBtn
        type='button'
        aria-label='댓글'
        onClick={openCommentModalHanlder}
        $isWebpSupported={isWebpSupported}
      />
      <Count>{commentCount}</Count>
    </ButtonWrapper>
  );
}
