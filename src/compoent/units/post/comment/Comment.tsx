import React, { useRef } from "react";
import { Dim, Wrapper } from "./comment.styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";

import { commentSlice } from "../../../../slice/commentSlice";
import CommentModal from "./CommentModal.container";
import { replySlice } from "../../../../slice/replySlice";
import { thunkUpdatePostCommentCount } from "../../../../slice/postSlice";
import { isMobile } from "react-device-detect";

export default function Comment() {
  const isOpenCommentModal = useSelector(
    (state: RootState) => state.comment.isOpenCommentModal
  );
  const isOpenReplyModal = useSelector(
    (state: RootState) => state.reply.isOpenReplyModal
  );
  const dispatch = useDispatch<AppDispatch>();
  const postId = useSelector((state: RootState) => state.comment.postId);
  const commentModalRef = useRef<HTMLDivElement>(null);
  const replyModalRef = useRef<HTMLDivElement>(null);

  /**
   * Dim(모달창 어두운 배경) 클릭 시 모달창 닫기
   */
  const closeCommentModal = () => {
    if (commentModalRef.current) {
      if (commentModalRef.current) {
        const animation = window
          .getComputedStyle(commentModalRef.current)
          .getPropertyValue("animation");
        if (!animation.includes("moveUp")) {
          return;
        }
      }
      if (!isOpenReplyModal) {
        dispatch(thunkUpdatePostCommentCount(postId));
        commentModalRef.current.style.animation = "moveDown 1s";
        setTimeout(() => {
          document.body.style.overflow = "auto";
          dispatch(commentSlice.actions.setIsOpenCommentModal(false));
        }, 800);
      } else {
        commentModalRef.current.style.animation = "moveDown 1s";
        if (replyModalRef.current) {
          replyModalRef.current.style.animation = "moveDown 1s";
        }
        setTimeout(() => {
          document.body.style.overflow = "auto";
          dispatch(commentSlice.actions.setIsOpenCommentModal(false));
          dispatch(replySlice.actions.setIsOpenReplyModal(false));
        }, 800);
      }
      // 모바일일 시 빈 히스토리를 없애기 위해
      if (isMobile) history.back();
    }
  };

  return (
    <Wrapper
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 27) {
          closeCommentModal();
        }
      }}
    >
      <Dim onClick={closeCommentModal}></Dim>
      {isOpenCommentModal && (
        <CommentModal
          commentModalRef={commentModalRef}
          replyModalRef={replyModalRef}
          isReply={false}
        />
      )}
      {isOpenReplyModal && (
        <CommentModal
          commentModalRef={commentModalRef}
          replyModalRef={replyModalRef}
          isReply={true}
        />
      )}
    </Wrapper>
  );
}
