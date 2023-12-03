import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { RootState } from "../../../store/store";
import { useCommentLeaveMutation } from "../../query/post/comment/useCommentLeaveMutation";
import { useCommentUpdateMutation } from "../../query/post/comment/useCommentUpdateMutation";
import { useReplyLeaveMutation } from "../../query/post/reply/useReplyLeaveMutation.";
import { useReplyUpdateMutation } from "../../query/post/reply/useReplyUpdateMutation";
import { useCallback, useState } from "react";
import { Timestamp } from "firebase/firestore";

interface IProps {
  isReply: boolean;
  initalvalue: string;
  commentId?: string;
  replyId?: string;
  closeTextarea?: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  postType: "HOME" | "FEED" | "PROFILE";
  textareaType: "write" | "edit" | "reply";
}

export const useCommentTextarea = ({
  initalvalue,
  postType,
  textareaRef,
  commentId,
  replyId,
  closeTextarea,
  isReply,
  textareaType
}: IProps) => {
  const postId = useSelector((state: RootState) => state.comment.postId);
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const [commentValue, setCommentValue] = useState(initalvalue);

  const { mutate: commentLeaveMutate } = useCommentLeaveMutation(postType);
  const { mutate: commentUpdateMutate } = useCommentUpdateMutation(postType);
  const { mutate: replyLeaveMutate } = useReplyLeaveMutation(postType);
  const { mutate: replyUpdateMutate } = useReplyUpdateMutation(postType);

  /**
   * textarea 높이 자동 조절
   */
  const handleResizeHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, []);

  const onChangeCommentValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleResizeHeight();
    if (e.target.value === " " && e.target.value.length === 1) {
      return;
    }
    setCommentValue(e.target.value);
  };

  /**
   * 빈 문자열 전송을 제한
   */
  const preventKeydownEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.currentTarget.value && e.key === "Enter") {
      e.preventDefault();
      return;
    }
  };

  /**
   * textareaType별로 작성, 수정 ,삭제 처리
   */
  const onSubmitComment = useCallback(() => {
    switch (textareaType) {
      case "write":
        {
          const commentId = uuid();
          const commnetData = {
            commentId,
            postId,
            uid: myInfo.uid,
            content: commentValue,
            createdAt: Timestamp.fromDate(new Date()),
            isBlock: false,
            reportCount: 0,
            replyCount: 0,
            reportUidList: []
          };
          commentLeaveMutate(commnetData);
          setCommentValue("");
        }
        break;

      case "edit":
        {
          if (!isReply) {
            // 타입 가드
            if (!commentId) return;
            const commentEditData = {
              commentId,
              content: commentValue,
              postId
            };
            commentUpdateMutate(commentEditData);
            if (closeTextarea) closeTextarea();
          } else {
            // 타입 가드
            if (!replyId || !commentId) return;
            const replyEditData = {
              replyId,
              parentCommentId: commentId,
              content: commentValue,
              postId: postId
            };
            replyUpdateMutate(replyEditData);
            if (closeTextarea) closeTextarea();
          }
        }
        break;

      case "reply":
        {
          // 타입 가드
          if (!commentId) return;
          const replyId = uuid();
          const replyData = {
            postId,
            replyId,
            parentCommentId: commentId,
            uid: myInfo.uid,
            content: commentValue,
            createdAt: Timestamp.fromDate(new Date()),
            isBlock: false,
            reportCount: 0,
            reportUidList: []
          };
          replyLeaveMutate(replyData);
          setCommentValue("");
        }
        break;

      default:
        return;
    }
  }, [textareaType, isReply, commentId, replyId, commentValue]);

  return {
    commentValue,
    onChangeCommentValue,
    preventKeydownEnter,
    onSubmitComment
  };
};
