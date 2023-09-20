import React, { useRef } from "react";
import { Dim, Wrapper } from "./comment.styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";

import { commentSlice } from "../../../../slice/commentSlice";
import CommentModal from "./CommentModal";
import { replySlice } from "../../../../slice/replySlice";

export default function Comment() {
  const isOpenReplyModal = useSelector(
    (state: RootState) => state.reply.isOpenReplyModal
  );
  const dispatch = useDispatch<AppDispatch>();
  const commentModalRef = useRef<HTMLDivElement>(null);
  const ReplyModalRef = useRef<HTMLDivElement>(null);
  const closeCommentModal = () => {
    if (commentModalRef.current) {
      if (!isOpenReplyModal) {
        commentModalRef.current.style.animation = "moveDown 1s";
        setTimeout(() => {
          document.body.style.overflow = "auto";
          dispatch(commentSlice.actions.setIsOpenCommentModal(false));
        }, 800);
      } else {
        commentModalRef.current.style.animation = "moveDown 1s";
        if (ReplyModalRef.current) {
          ReplyModalRef.current.style.animation = "moveDown 1s";
        }
        setTimeout(() => {
          document.body.style.overflow = "auto";
          dispatch(commentSlice.actions.setIsOpenCommentModal(false));
          dispatch(replySlice.actions.setIsOpenReplyModal(false));
        }, 800);
      }
    }
  };

  return (
    <Wrapper>
      <Dim onClick={closeCommentModal}></Dim>
      <CommentModal modalRef={commentModalRef} isReply={false} />
      {isOpenReplyModal && (
        <CommentModal modalRef={ReplyModalRef} isReply={true} />
      )}
    </Wrapper>
  );
}
