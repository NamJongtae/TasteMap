import React, { useCallback, useEffect, useRef } from "react";

import {
  commentSlice,
} from "../../../../slice/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { replySlice } from "../../../../slice/replySlice";
import { isMobile } from "react-device-detect";
import CommentModalUI from "./CommentModal.presenter";
import { useFetchCommentCountMutation } from "../../../../hook/query/post/useFetchCommentCountMutation";

interface IProps {
  commentModalRef: React.RefObject<HTMLDivElement>;
  replyModalRef: React.RefObject<HTMLDivElement>;
  isReply: boolean;
  postType: "HOME" | "FEED" | "PROFILE";
}

export default function CommentModal({
  commentModalRef,
  replyModalRef,
  isReply,
  postType
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
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const dispatch = useDispatch<AppDispatch>();
  const postId = useSelector((state: RootState) => state.comment.postId);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const firstItemLinkRef = useRef<HTMLAnchorElement>(null);
  /**
   * 모달창 닫기 버튼 클릭 시 모달창 닫기
   */
  const closeCommentModal = useCallback(() => {
    if (commentModalRef.current && !isOpenReplyModal) {

      commentModalRef.current.style.animation = "moveDown 1s";
      setTimeout(() => {
        dispatch(commentSlice.actions.setIsOpenCommentModal(false));
        // 빈 히스토리를 없애기 위해 뒤로가기
        if (isMobile) {
          history.back();
        }
      }, 800);
    } else if (replyModalRef.current) {
      replyModalRef.current.style.animation = "replyInActive 1s";
      setTimeout(() => {
        dispatch(replySlice.actions.setIsOpenReplyModal(false));
      }, 700);
    }
  }, [isOpenReplyModal, isMobile]);

  /**
   * 모바일 뒤로가기 시 모달창 닫기
   */
  const closeModalMobile = useCallback(() => {
    if (commentModalRef.current) {
      if (!isOpenReplyModal) {
        commentModalRef.current.style.animation = "moveDown 1s";
        setTimeout(() => {
          dispatch(commentSlice.actions.setIsOpenCommentModal(false));
        }, 800);
      } else {
        commentModalRef.current.style.animation = "moveDown 1s";
        if (replyModalRef.current) {
          replyModalRef.current.style.animation = "moveDown 1s";
        }
        setTimeout(() => {
          dispatch(commentSlice.actions.setIsOpenCommentModal(false));
          dispatch(replySlice.actions.setIsOpenReplyModal(false));
        }, 800);
      }
    }
  }, [isOpenReplyModal]);
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

  const { mutate } = useFetchCommentCountMutation(postType);

  useEffect(() => {
    return () => {
      mutate(postId);
    };
  }, []);

  return (
    <CommentModalUI
      isReply={isReply}
      modalRef={isReply ? replyModalRef : commentModalRef}
      myInfo={myInfo}
      parentCommentId={parentCommentId}
      closeCommentModal={closeCommentModal}
      closeBtnRef={closeBtnRef}
      textareaRef={textareaRef}
      firstItemLinkRef={firstItemLinkRef}
      postType={postType}
    />
  );
}
