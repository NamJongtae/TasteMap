import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useCallback, useRef } from "react";
import { isMobile } from "react-device-detect";
import { commentSlice } from "../../../slice/commentSlice";
import { replySlice } from "../../../slice/replySlice";

export const useCommentWrapper = () => {
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

  return {
    isOpenCommentModal,
    isOpenReplyModal,
    closeCommentModal,
    commentModalRef,
    replyModalRef
  };
};
