import { useCallback } from "react";
import {
  sweetConfirm,
  sweetToast
} from "../../../../library/sweetAlert/sweetAlert";
import { IReplyData } from "../../../../types/apiTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useReplyReportMutation } from "../../../query/post/reply/useReplyReportMutation";

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
  data: IReplyData;
}

export const useReplyReport = ({ postType, data }: IProps) => {
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const isReport = data.reportUidList.includes(myInfo.uid);
  const { mutate: replyReportMutate } = useReplyReportMutation(postType);

  const reportReplyHandler = useCallback(() => {
    // 댓글 신고
    // 중복 신고 방지
    if (isReport) {
      sweetToast("이미 신고한 댓글 입니다.", "warning");
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
  }, []);

  return { reportReplyHandler };
};
