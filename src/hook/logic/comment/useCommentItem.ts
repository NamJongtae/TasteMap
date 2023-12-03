import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useCallback, useMemo, useState } from "react";
import { useCommentRemoveMutation } from "../../query/post/comment/useCommentRemoveMutation";
import { useCommentReportMutation } from "../../query/post/comment/useCommentReportMutation";
import { useReplyRemoveMutation } from "../../query/post/reply/useReplyRemoveMutation";
import { useReplyReportMutation } from "../../query/post/reply/useReplyReportMutation";
import {
  sweetConfirm,
  sweetToast
} from "../../../library/sweetAlert/sweetAlert";
import { replySlice } from "../../../slice/replySlice";
import { ICommentData, IReplyData } from "../../../api/apiType";
import { commentSlice } from "../../../slice/commentSlice";
import { setDateFormat } from "../../../library/setDateFormat";

interface IProps {
  data: ICommentData | IReplyData;
  postType: "HOME" | "FEED" | "PROFILE";
  isReply: boolean;
}

export const useCommentItem = ({ data, postType, isReply }: IProps) => {
  const postId = useSelector((state: RootState) => state.comment.postId);
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const dispatch = useDispatch<AppDispatch>();
  const [isEdit, setIsEdit] = useState(false);
  const isReport = data.reportUidList.includes(myInfo.uid);

  const { mutate: commentRemoveMutate } = useCommentRemoveMutation(postType);
  const { mutate: commentReportMutate } = useCommentReportMutation(postType);
  const { mutate: replyRemoveMutate } = useReplyRemoveMutation(postType);
  const { mutate: replyReportMutate } = useReplyReportMutation(postType);

  const openEditTextareaHandler = useCallback(() => {
    setIsEdit(false);
  }, [isEdit]);

  const closeEditTextareaHandler = useCallback(() => {
    setIsEdit(false);
  }, [isEdit]);

  const closeCommentModalHandler = () => {
    dispatch(commentSlice.actions.setIsOpenCommentModal(false));
  };

  const openReplyModalHandler = () => {
    dispatch(replySlice.actions.setIsOpenReplyModal(true));
    // 답글 창이 열릴 때 현재 댓글 id 저장
    if ("commentId" in data) {
      dispatch(replySlice.actions.setParentCommentId(data.commentId));
    }
  };

  const closeReplyModalHanlder = () => {
    dispatch(replySlice.actions.setIsOpenReplyModal(false));
  };

  const removeHandler = useCallback(() => {
    if (data) {
      sweetConfirm("정말 삭제하겠습니까?", "삭제", "취소", () => {
        if (!isReply) {
          commentRemoveMutate(data as ICommentData);
        } else {
          replyRemoveMutate({
            parentCommentId: (data as IReplyData).parentCommentId,
            replyId: (data as IReplyData).replyId,
            postId: data.postId
          });
        }
      });
    }
  }, [data]);

  const reportHandler = useCallback(() => {
    // 댓글 신고
    if (!isReply && "commentId" in data) {
      // 중복 신고 방지
      if (isReport) {
        sweetToast("이미 신고한 댓글 입니다.", "warning");
        return;
      }
      sweetConfirm("신고 하시겠습니까?", "신고", "취소", () => {
        commentReportMutate({
          commentId: data.commentId,
          reportCount: data.reportCount,
          postId
        });
      });
    } else if (isReply && "replyId" in data) {
      // 답글 신고
      // 중복 신고 방지
      if (isReport) {
        sweetToast("이미 신고한 답글 입니다.", "warning");
        return;
      }
      sweetConfirm("신고 하시겠습니까?", "신고", "취소", () => {
        replyReportMutate({
          parentCommentId: data.parentCommentId,
          replyId: data.replyId,
          reportCount: data.reportCount,
          postId: data.postId
        });
      });
    }
  }, [isReply, isReport]);

  // 유저 프로필 클릭 시 프로필 페이지 이동 전 모달 창 닫기
  const closeModalAndMoveToProfile = () => {
    if (!isReply) {
      closeCommentModalHandler();
    } else {
      closeCommentModalHandler();
      closeReplyModalHanlder();
    }
  };

  const formattedDate = useMemo(() => {
    if (data.createdAt?.seconds) {
      return setDateFormat(data.createdAt?.seconds * 1000);
    }
  }, [data.createdAt?.seconds]);

  return {
    myInfo,
    isEdit,
    openEditTextareaHandler,
    closeEditTextareaHandler,
    openReplyModalHandler,
    closeReplyModalHanlder,
    reportHandler,
    removeHandler,
    formattedDate,
    closeModalAndMoveToProfile
  };
};
