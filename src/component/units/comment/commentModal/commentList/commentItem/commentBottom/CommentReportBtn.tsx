import React from "react";
import { ICommentData, IReplyData } from "../../../../../../../types/apiTypes";
import { useCommentReport } from "../../../../../../../hook/logic/comment/commentItem/useCommentReport";
import { useReplyReport } from "../../../../../../../hook/logic/comment/commentItem/useReplyReport";
import { CommentBtn } from "../../../commentModal.styles";

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
  isReply: boolean;
  data: ICommentData | IReplyData;
}

export default function CommentReportBtn({ postType, isReply, data }: IProps) {
  const { reportCommentHandler } = useCommentReport({
    postType,
    data: data as ICommentData
  });

  const { reportReplyHandler } = useReplyReport({
    postType,
    data: data as IReplyData
  });

  return (
    <CommentBtn onClick={isReply ? reportReplyHandler : reportCommentHandler}>
      신고
    </CommentBtn>
  );
}
