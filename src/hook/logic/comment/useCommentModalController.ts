import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useCallback, useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import { commentSlice } from "../../../slice/commentSlice";
import { replySlice } from "../../../slice/replySlice";
import { useFetchCommentCountMutation } from "../../query/post/useFetchCommentCountMutation";
import { useHistoryMobileBackBtn } from "../../useHistoryMobileBackBtn";
import { ICommentData } from "../../../types/apiTypes";
import { useFetchReplyCountMutation } from "../../query/post/comment/useFetchReplyCountMutation";

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
}

export const useCommentModalController = ({ postType }: IProps) => {
  const isOpenCommentModal = useSelector(
    (state: RootState) => state.comment.isOpenCommentModal
  );
  const isOpenReplyModal = useSelector(
    (state: RootState) => state.reply.isOpenReplyModal
  );
  const dispatch = useDispatch<AppDispatch>();
  const commentId = useSelector(
    (state: RootState) => state.reply.parentCommentId
  );
  const postId = useSelector((state: RootState) => state.comment.postId);
  const commentModalRef = useRef<HTMLDivElement>(null);
  const replyModalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const firstItemLinkRef = useRef<HTMLAnchorElement>(null);

  // 게시물 댓글 수 업데이트
  const { mutate: commentCountMutate } = useFetchCommentCountMutation(postType);
  const { mutate: replyCountMutate } = useFetchReplyCountMutation(postId);

  const openReplyModalHandler = (data: ICommentData) => {
    dispatch(replySlice.actions.setIsOpenReplyModal(true));
    dispatch(replySlice.actions.setParentCommentId(data.commentId));
  };

  const closeMoveLeftReplyModal = () => {
    if (replyModalRef.current) {
      replyModalRef.current.style.animation = "replyInActive 1s";
      setTimeout(() => {
        dispatch(replySlice.actions.setIsOpenReplyModal(false));
      }, 700);
    }
  };

  const closeCommentModal = () => {
    if (commentModalRef.current) {
      commentModalRef.current.style.animation = "moveDown 1s";
      setTimeout(() => {
        // 빈 히스토리를 없애기 위해 뒤로가기
        if (isMobile) {
          history.back();
        }
        dispatch(commentSlice.actions.setIsOpenCommentModal(false));
      }, 800);
    }
  };

  const closeMoveDownReplyModal = () => {
    if (replyModalRef.current) {
      replyModalRef.current.style.animation = "moveDown 1s";
    }
    setTimeout(() => {
      dispatch(replySlice.actions.setIsOpenReplyModal(false));
    }, 800);
  };

  const closeAllModalHandler = useCallback(() => {
    closeCommentModal();
    closeMoveDownReplyModal();
  }, []);

  const closeNoHistoryBackModalHandler = () => {
    if (commentModalRef.current) {
      commentModalRef.current.style.animation = "moveDown 1s";
      setTimeout(() => {
        dispatch(commentSlice.actions.setIsOpenCommentModal(false));
      }, 800);
    }
    closeMoveDownReplyModal();
  };

  useHistoryMobileBackBtn({
    handlePopStateCb: closeNoHistoryBackModalHandler
  });

  // 모달창이 열린 후 게시물 댓글 수를 업데이트
  useEffect(() => {
    if (isOpenCommentModal) {
      commentCountMutate(postId);
    }
  }, [isOpenCommentModal]);

  // 모달창이 열린 댓글 답글 수를 업데이트
  useEffect(() => {
    if (isOpenReplyModal) {
      replyCountMutate(commentId);
    }
  }, [isOpenReplyModal]);

  return {
    isOpenCommentModal,
    isOpenReplyModal,
    openReplyModalHandler,
    closeCommentModal,
    closeMoveLeftReplyModal,
    closeMoveDownReplyModal,
    closeAllModalHandler,
    closeNoHistoryBackModalHandler,
    commentModalRef,
    replyModalRef,
    closeBtnRef,
    textareaRef,
    firstItemLinkRef
  };
};
