import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { commentSlice } from "../../../../slice/commentSlice";

export const useOpenCommentModal = (postId: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const openCommentModalHanlder = useCallback(() => {
    dispatch(commentSlice.actions.setIsOpenCommentModal(true));
    dispatch(commentSlice.actions.setPostId(postId));
  }, []);

  return openCommentModalHanlder;
};
