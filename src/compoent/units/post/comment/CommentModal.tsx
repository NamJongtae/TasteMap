import React, { SyntheticEvent } from "react";
import {
  CloseBtn,
  CommentModalWrapper,
  CommentTextAreaWrapper,
  ModalTitle,
  ModalTitleBar,
  UserImg
} from "./comment.styles";
import { resolveWebp } from "../../../../library/webpSupport";
import { commentSlice } from "../../../../slice/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import CommentList from "./CommentList";
import CommentTextArea from "./CommentTextArea";
import { replySlice } from "../../../../slice/replySlice";

interface IProps {
  modalRef: React.RefObject<HTMLDivElement>;
  isReply: boolean;
}

export default function CommentModal({ modalRef, isReply }: IProps) {
  const parentCommentId = useSelector(
    (state: RootState) => state.reply.parentCommentId
  );
  const userData = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch<AppDispatch>();
  const closeCommentModal = () => {
    if (modalRef.current) {
      if (!isReply) {
        modalRef.current.style.animation = "moveDown 1s";
        setTimeout(() => {
          document.body.style.overflow = "auto";
          dispatch(commentSlice.actions.setIsOpenCommentModal(false));
        }, 800);
      } else {
        modalRef.current.style.animation = "replyInActive 1s";
        setTimeout(() => {
          dispatch(replySlice.actions.setIsOpenReplyModal(false));
        }, 700);
      }
    }
  };

  return (
    <CommentModalWrapper ref={modalRef} isReply={isReply}>
      <ModalTitleBar>
        <ModalTitle>{isReply ? "답글" : "댓글"}</ModalTitle>
      </ModalTitleBar>
      <CommentList isReply={isReply} />
      <CommentTextAreaWrapper>
        <UserImg
          src={userData.photoURL}
          alt='프로필 이미지'
          onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
              (e.currentTarget.src = resolveWebp(
                "/assets/webp/icon-defaultProfile.webp",
                "svg"
              ))
          }}
        />
        <CommentTextArea
          initalvalue=''
          isReply={isReply}
          textAreaType={isReply ? "reply" : "write"}
          commentId={parentCommentId}
        />
      </CommentTextAreaWrapper>

      <CloseBtn
        type='button'
        aria-label='닫기'
        onClick={closeCommentModal}
        isReply={isReply}
      />
    </CommentModalWrapper>
  );
}
