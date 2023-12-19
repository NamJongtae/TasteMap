import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { RootState } from "../../../../store/store";
import { FieldValues } from "react-hook-form";
import { Timestamp } from "firebase/firestore";
import { useReplyLeaveMutation } from '../../../query/post/reply/useReplyLeaveMutation.';

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
  commentId?: string;
}

export const useReplyLeave = ({ postType, commentId }: IProps) => {
  const postId = useSelector((state: RootState) => state.comment.postId);
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const { mutate: replyLeaveMutate } = useReplyLeaveMutation(postType);
  const replyLeaveHandler = (data: FieldValues) => {
    if(!commentId) return;
    const replyId = uuid();
    const replyData = {
      postId,
      replyId,
      parentCommentId: commentId,
      uid: myInfo.uid,
      content: data.reply,
      createdAt: Timestamp.fromDate(new Date()),
      isBlock: false,
      reportCount: 0,
      reportUidList: []
    };
    replyLeaveMutate(replyData);
  };

  return { replyLeaveHandler };
};
