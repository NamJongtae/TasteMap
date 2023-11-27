import React, { useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { Dim, Wrapper } from "./comment.styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { commentSlice } from "../../../../slice/commentSlice";
import CommentModal from "./CommentModal.container";
import { replySlice } from "../../../../slice/replySlice";
import { isMobile } from "react-device-detect";

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
}

interface IModalProps {
  closeCommentModal: () => void;
  isOpenCommentModal: boolean;
  isOpenReplyModal: boolean;
  commentModalRef: React.RefObject<HTMLDivElement>;
  replyModalRef: React.RefObject<HTMLDivElement>;
  postType: "HOME" | "FEED" | "PROFILE";
}

const Modal = ({
  closeCommentModal,
  isOpenCommentModal,
  isOpenReplyModal,
  commentModalRef,
  replyModalRef,
  postType
}: IModalProps) => {
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
          postType={postType}
        />
      )}
      {isOpenReplyModal && (
        <CommentModal
          commentModalRef={commentModalRef}
          replyModalRef={replyModalRef}
          isReply={true}
          postType={postType}
        />
      )}
    </Wrapper>
  );
};

export default function Comment({ postType }: IProps) {
  const isOpenCommentModal = useSelector(
    (state: RootState) => state.comment.isOpenCommentModal
  );
  const isOpenReplyModal = useSelector(
    (state: RootState) => state.reply.isOpenReplyModal
  );
  const dispatch = useDispatch<AppDispatch>();
  const commentModalRef = useRef<HTMLDivElement>(null);
  const replyModalRef = useRef<HTMLDivElement>(null);

  /**
   * Dim(모달창 어두운 배경) 클릭 시 모달창 닫기
   */
  const closeCommentModal = useCallback(() => {
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
      // 모바일일 시 빈 히스토리를 없애기 위해
      if (isMobile) history.back();
    }
  }, [isOpenReplyModal, isMobile]);

  return (
    <>
      {ReactDOM.createPortal(
        <Modal
          closeCommentModal={closeCommentModal}
          isOpenCommentModal={isOpenCommentModal}
          isOpenReplyModal={isOpenReplyModal}
          commentModalRef={commentModalRef}
          replyModalRef={replyModalRef}
          postType={postType}
        />,
        document.getElementById("modal-root") as HTMLDivElement
      )}
    </>
  );
}
