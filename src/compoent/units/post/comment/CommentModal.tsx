import React, { SyntheticEvent, useEffect } from "react";
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
import { isMobile } from "react-device-detect";

interface IProps {
  modalRef: React.RefObject<HTMLDivElement>;
  isReply: boolean;
}

export default function CommentModal({ modalRef, isReply }: IProps) {
  const isOpenReplyModal = useSelector(
    (state: RootState) => state.reply.isOpenReplyModal
  );
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

  // 모바일 뒤로가기 구현을 위해 빈 히스토리 생성
  // 뒤로가기 버튼을 눌러도 현재 페이지가 유지됨
  useEffect(() => {
    if (isMobile) {
      window.history.pushState(null, "", window.location.href);
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
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
  }, [isOpenReplyModal]);

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
            e.currentTarget.src = resolveWebp(
              "/assets/webp/icon-defaultProfile.webp",
              "svg"
            );
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
