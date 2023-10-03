import React, { useEffect } from "react";

import {
  commentSlice,
  thunkUpdateReplyCount
} from "../../../../slice/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { replySlice } from "../../../../slice/replySlice";
import { isMobile } from "react-device-detect";
import { thunkUpdatePostCommentCount } from "../../../../slice/postSlice";
import CommentModalUI from "./CommentModal.presenter";

interface IProps {
  modalRef: React.RefObject<HTMLDivElement>;
  isReply: boolean;
}

export default function CommentModal({ modalRef, isReply }: IProps) {
  const isOpenCommnetModal = useSelector(
    (state: RootState) => state.comment.isOpenCommentModal
  );
  const isOpenReplyModal = useSelector(
    (state: RootState) => state.reply.isOpenReplyModal
  );
  const parentCommentId = useSelector(
    (state: RootState) => state.reply.parentCommentId
  );
  const userData = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch<AppDispatch>();
  const postId = useSelector((state: RootState) => state.comment.postId);
  const commentId = useSelector(
    (state: RootState) => state.reply.parentCommentId
  );
  const closeCommentModal = () => {
    if (modalRef.current) {
      if(isMobile) {
        window.onpopstate= () => {
          history.back();
        }
      }
      if (!isReply) {
        dispatch(thunkUpdatePostCommentCount(postId));
        modalRef.current.style.animation = "moveDown 1s";
        setTimeout(() => {
          document.body.style.overflow = "auto";
          dispatch(commentSlice.actions.setIsOpenCommentModal(false));
        }, 800);
      } else {
        dispatch(thunkUpdateReplyCount(commentId));
        modalRef.current.style.animation = "replyInActive 1s";
        setTimeout(() => {
          dispatch(replySlice.actions.setIsOpenReplyModal(false));
        }, 700);
      }
    }
  };

  // 모바일 뒤로가기 구현을 위해 빈 히스토리 생성
  // 뒤로가기 버튼을 눌러도 현재 페이지가 유지됨
  useEffect(() => {
    if (isMobile) {
      window.history.pushState(null, "", window.location.href);
    }
  }, []);

  useEffect(() => {
    if ((isMobile && isOpenReplyModal) || isOpenCommnetModal) {
      window.onpopstate = () => {
        history.go(1);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.handleGoback();
      };
      // 뒤로가기 버튼을 눌렀을 경우 실행될 로직: 모달창 닫기
      window.onpopstate = () => {
        closeCommentModal();
      };
    }
  }, [isOpenReplyModal, isOpenCommnetModal]);

  return (
    <CommentModalUI
      isReply={isReply}
      modalRef={modalRef}
      userData={userData}
      parentCommentId={parentCommentId}
      closeCommentModal={closeCommentModal}
    />
  );
}
