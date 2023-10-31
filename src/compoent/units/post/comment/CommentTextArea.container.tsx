import React, { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";

import { Timestamp } from "firebase/firestore";
import {
  thunkFetchAddComment,
  thunkFetchEditComment
} from "../../../../slice/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import {
  thunkFetchAddReply,
  thunkFetchEditReply
} from "../../../../slice/replySlice";
import CommentTextAreaUI from "./CommentTextArea.presenter";

interface IProps {
  textAreaType: "write" | "edit" | "reply";
  isReply: boolean;
  initalvalue: string;
  commentId?: string;
  replyId?: string;
  closeTextArea?: () => void;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export default function CommentTextArea({
  textAreaType,
  isReply,
  initalvalue,
  commentId,
  replyId,
  closeTextArea,
  closeBtnRef,
  textareaRef
}: IProps) {
  const postId = useSelector((state: RootState) => state.comment.postId);
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const dispatch = useDispatch<AppDispatch>();
  const [commentValue, setCommentValue] = useState(initalvalue);

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
            uid: myInfo.uid || "",
            content: commentValue,
            createdAt: Timestamp.fromDate(new Date()),
            isBlock: false,
            reportCount: 0,
            replyCount: 0,
            reportUidList: []
          };
          dispatch(thunkFetchAddComment(commnetData)).then(() => {
            setCommentValue("");
          });
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
            dispatch(thunkFetchEditComment(commentEditData)).then(() => {
              if (closeTextArea) closeTextArea();
            });
          } else {
            // 타입 가드
            if (!replyId || !commentId) return;
            const replyEditData = {
              replyId,
              parentCommentId: commentId,
              content: commentValue,
              postId: postId
            };
            dispatch(thunkFetchEditReply(replyEditData)).then(() => {
              if (closeTextArea) closeTextArea();
            });
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
            uid: myInfo.uid || "",
            content: commentValue,
            createdAt: Timestamp.fromDate(new Date()),
            isBlock: false,
            reportCount: 0,
            reportUidList: []
          };
          dispatch(thunkFetchAddReply(replyData));
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
