import React, { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";

import { Timestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";;
import CommentTextAreaUI from "./CommentTextArea.presenter";
import { useCommentLeaveMutation } from "../../../../hook/query/post/comment/useCommentLeaveMutation";
import { useCommentUpdateMutation } from "../../../../hook/query/post/comment/useCommentUpdateMutation";
import { useReplyLeaveMutation } from "../../../../hook/query/post/reply/useReplyLeaveMutation.";
import { useReplyUpdateMutation } from "../../../../hook/query/post/reply/useReplyUpdateMutation";

interface IProps {
  textAreaType: "write" | "edit" | "reply";
  isReply: boolean;
  initalvalue: string;
  commentId?: string;
  replyId?: string;
  closeTextArea?: () => void;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  postType: "HOME" | "FEED" | "PROFILE";
}

export default function CommentTextArea({
  textAreaType,
  isReply,
  initalvalue,
  commentId,
  replyId,
  closeTextArea,
  closeBtnRef,
  textareaRef,
  postType
}: IProps) {
  const postId = useSelector((state: RootState) => state.comment.postId);
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const [commentValue, setCommentValue] = useState(initalvalue);

  const { mutate: commentLeaveMutate } = useCommentLeaveMutation(postType);
  const { mutate: commentUpdateMutate } = useCommentUpdateMutation(postType);
  const { mutate: replyLeaveMutate } = useReplyLeaveMutation(postType);
  const { mutate: replyUpdateMutate } = useReplyUpdateMutation(postType);
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

  // 텍스트가 없는 경우 엔터키를 막음 빈 문자열 전송을 제한
  const preventKeydownEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.currentTarget.value && e.key === "Enter") {
      e.preventDefault();
      return;
    }
  };

  const onSubmitComment = useCallback(() => {
    switch (textAreaType) {
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
            if (closeTextArea) closeTextArea();
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
            if (closeTextArea) closeTextArea();
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
  }, [textAreaType, isReply, commentId, replyId, commentValue]);

  return (
    <CommentTextAreaUI
      textAreaType={textAreaType}
      initalvalue={initalvalue}
      commentValue={commentValue}
      onChangeCommentValue={onChangeCommentValue}
      preventKeydownEnter={preventKeydownEnter}
      isReply={isReply}
      onSubmitComment={onSubmitComment}
      textareaRef={textareaRef}
      closeBtnRef={closeBtnRef}
    />
  );
}
