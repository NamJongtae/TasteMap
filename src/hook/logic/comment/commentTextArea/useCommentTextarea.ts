import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { RootState } from "../../../../store/store";
import { useCommentLeaveMutation } from "../../../query/post/comment/useCommentLeaveMutation";
import { useCommentUpdateMutation } from "../../../query/post/comment/useCommentUpdateMutation";
import { useReplyLeaveMutation } from "../../../query/post/reply/useReplyLeaveMutation.";
import { useReplyUpdateMutation } from "../../../query/post/reply/useReplyUpdateMutation";
import { useCallback } from "react";
import { Timestamp } from "firebase/firestore";
import { useTextarea } from "../../../useTextarea";

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

  const { mutate: commentLeaveMutate } = useCommentLeaveMutation(postType);
  const { mutate: commentUpdateMutate } = useCommentUpdateMutation(postType);
  const { mutate: replyLeaveMutate } = useReplyLeaveMutation(postType);
  const { mutate: replyUpdateMutate } = useReplyUpdateMutation(postType);

  const {
    value: commentValue,
    setValue: setCommentValue,
    onChangeValue: onChangeCommentValue,
    preventKeydownEnter
  } = useTextarea(initalvalue, textareaRef, 0);

  const commentLeave = () => {
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
  };

  const commentUpadte = () => {
    // 타입 가드
    if (!commentId) return;
    const commentEditData = {
      commentId: commentId,
      content: commentValue,
      postId
    };
    commentUpdateMutate(commentEditData);
    if (closeTextarea) closeTextarea();
  };

  const replyLeave = () => {
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
  };

  const replyUpdate = () => {
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
  };

  /**
   * textareaType별로 작성, 수정 ,삭제 처리
   */
  const onSubmitComment = useCallback(() => {
    switch (textareaType) {
      case "write": {
        commentLeave();
        break;
      }

      case "edit": {
        if (!isReply) {
          commentUpadte();
        } else {
          replyUpdate();
        }
        break;
      }

      case "reply": {
        replyLeave();
        break;
      }

      default:
        return;
    }
  }, [
    textareaType,
    isReply,
    commentLeave,
    commentUpadte,
    replyUpdate,
    replyLeave
  ]);

  return {
    commentValue,
    onChangeCommentValue,
    preventKeydownEnter,
    onSubmitComment
  };
};
