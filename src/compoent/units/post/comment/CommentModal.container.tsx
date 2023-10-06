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
  commentModalRef: React.RefObject<HTMLDivElement>;
  replyModalRef: React.RefObject<HTMLDivElement>;
  isReply: boolean;
}

export default function CommentModal({
  commentModalRef,
  replyModalRef,
  isReply
}: IProps) {
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
  /**
   * 모달창 닫기 버튼 클릭 시 모달창 닫기
   */
  const closeCommentModal = () => {
    if (commentModalRef.current && !isOpenReplyModal) {
      dispatch(thunkUpdatePostCommentCount(postId));
      commentModalRef.current.style.animation = "moveDown 1s";
      setTimeout(() => {
        document.body.style.overflow = "auto";
        dispatch(commentSlice.actions.setIsOpenCommentModal(false));
        // 빈 히스토리를 없애기 위해 뒤로가기
        if (isMobile) {
          history.back();
        }
      }, 800);
    } else if (replyModalRef.current) {
      dispatch(thunkUpdateReplyCount(commentId));
      replyModalRef.current.style.animation = "replyInActive 1s";
      setTimeout(() => {
        dispatch(replySlice.actions.setIsOpenReplyModal(false));
      }, 700);
    }
  };

  /**
   * 모바일 뒤로가기 시 모달창 닫기
   */
  const closeModalMobile = () => {
    if (commentModalRef.current) {
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
    }
  };
  // 모바일 뒤로가기 구현을 위해 빈 히스토리 생성
  // 뒤로가기 버튼을 눌러도 현재 페이지가 유지됨
  useEffect(() => {
    if (isMobile && !isReply) {
      window.history.pushState(null, "", window.location.href);
    }
  }, []);

  useEffect(() => {
    if (isMobile && isOpenCommnetModal) {
      const handlePopState = () => {
        closeModalMobile();
      };

      window.onpopstate = handlePopState;

      return () => {
        // 컴포넌트가 언마운트될 때 이벤트 핸들러를 삭제
        window.onpopstate = null;
      };
    }
  }, []);

  return (
    <CommentModalUI
      isReply={isReply}
      modalRef={isReply ? replyModalRef : commentModalRef}
      userData={userData}
      parentCommentId={parentCommentId}
      closeCommentModal={closeCommentModal}
    />
  );
}
