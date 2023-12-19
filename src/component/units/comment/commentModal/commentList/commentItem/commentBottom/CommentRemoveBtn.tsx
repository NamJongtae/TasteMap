import React from "react";
import { useCommentRemove } from "../../../../../../../hook/logic/comment/commentItem/useCommentRemove";
import { useReplyRemove } from "../../../../../../../hook/logic/comment/commentItem/useReplyRemove";
import { ICommentData, IReplyData } from "../../../../../../../api/apiType";
import { CommentBtn } from '../../../commentModal.styles';

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
  isReply: boolean;
  data: ICommentData | IReplyData;
}

export default function CommentRemoveBtn({ postType, isReply, data }: IProps) {
  const { removeCommentHandler } = useCommentRemove({
    postType,
    data: data as ICommentData
  });

  const { removeReplyHandler } = useReplyRemove({
    postType,
    data: data as IReplyData
  });
  return (
    <CommentBtn onClick={isReply ? removeReplyHandler : removeCommentHandler}>
      삭제
    </CommentBtn>
  );
}
