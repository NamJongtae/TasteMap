import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { RootState } from "../../../../store/store";
import { useCommentLeaveMutation } from "../../../query/post/comment/useCommentLeaveMutation";
import { FieldValues } from "react-hook-form";
import { Timestamp } from "firebase/firestore";

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
}

export const useCommentLeave = ({ postType }: IProps) => {
  const postId = useSelector((state: RootState) => state.comment.postId);
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const { mutate: commentLeaveMutate } = useCommentLeaveMutation(postType);

  const commentLeaveHandler = (data: FieldValues) => {
    const commentId = uuid();
    const commnetData = {
      commentId,
      postId,
      uid: myInfo.uid,
      content: data.comment,
      createdAt: Timestamp.fromDate(new Date()),
      isBlock: false,
      reportCount: 0,
      replyCount: 0,
      reportUidList: []
    };
    commentLeaveMutate(commnetData);
  };

  return { commentLeaveHandler };
};
