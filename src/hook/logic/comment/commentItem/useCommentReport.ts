import { useCallback } from "react";
import {
  sweetConfirm,
  sweetToast
} from "../../../../library/sweetAlert/sweetAlert";
import { useCommentReportMutation } from "../../../query/post/comment/useCommentReportMutation";
import { ICommentData } from "../../../../api/apiType";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
  data: ICommentData;
}

export const useCommentReport = ({ postType, data }: IProps) => {
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const postId = useSelector((state: RootState) => state.comment.postId);
  const isReport = data.reportUidList.includes(myInfo.uid);
  const { mutate: commentReportMutate } = useCommentReportMutation(postType);

  const reportCommentHandler = useCallback(() => {
    // 댓글 신고
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
  }, []);

  return { reportCommentHandler };
};
