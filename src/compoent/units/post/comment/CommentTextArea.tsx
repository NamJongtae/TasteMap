import React, { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  CommentSubmitBtn,
  CommentTextAreaInner,
  TextArea
} from "./comment.styles";
import { Timestamp } from "firebase/firestore";
import {
  commentSlice,
  thunkFetchAddComment,
  thunkFetchEditComment
} from "../../../../slice/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { postSlice } from "../../../../slice/postSlice";
import {
  thunkFetchAddReply,
  thunkFetchEditReply
} from "../../../../slice/replySlice";

interface IProps {
  type: "write" | "edit" | "reply";
  isReply: boolean;
  initalvalue: string;
  commentId?: string;
  replyId?: string;
  closeTextArea?: () => void;
}

export default function CommentTextArea({
  type,
  isReply,
  initalvalue,
  commentId,
  replyId,
  closeTextArea
}: IProps) {
  const postListData = useSelector(
    (state: RootState) => state.post.postListData
  );
  const commentListData = useSelector(
    (state: RootState) => state.comment.commentListData
  );
  const postId = useSelector((state: RootState) => state.comment.postId);
  const userData = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch<AppDispatch>();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [commentValue, setCommentValue] = useState(initalvalue);

  const handleResizeHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };

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

  const onSubmitComment = () => {
    switch (type) {
      case "write":
        {
          const commentId = uuid();
          const commnetData = {
            commentId,
            postId,
            uid: userData.uid || "",
            content: commentValue,
            createdAt: Timestamp.fromDate(new Date()),
            isBlock: false,
            replyCount: 0
          };
          dispatch(thunkFetchAddComment(commnetData));
          const newData = [...postListData];
          const index = newData.findIndex((item) => item.id === postId);
          newData[index] = {
            ...newData[index],
            commentCount: (newData[index].commentCount || 0) + 1
          };
          dispatch(postSlice.actions.setPostListData(newData));
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
              content: commentValue
            };
            (async () => {
              await dispatch(thunkFetchEditComment(commentEditData));
              if (closeTextArea) closeTextArea();
            })();
          } else {
            // 타입 가드
            if (!replyId || !commentId) return;
            const replyEditData = {
              replyId,
              parentCommentId: commentId,
              content: commentValue
            };
            (async () => {
              await dispatch(thunkFetchEditReply(replyEditData));
              if (closeTextArea) closeTextArea();
            })();
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
            uid: userData.uid || "",
            content: commentValue,
            createdAt: Timestamp.fromDate(new Date()),
            isBlock: false
          };
          const newData = [...commentListData];
          const index = newData.findIndex(
            (item) => item.commentId === commentId
          );
          newData[index] = {
            ...newData[index],
            replyCount: (newData[index].replyCount || 0) + 1
          };
          dispatch(commentSlice.actions.setCommentListData(newData));
          dispatch(thunkFetchAddReply(replyData));
          setCommentValue("");
        }
        break;

      default:
        return;
    }
  };

  return (
    <CommentTextAreaInner type={type}>
      <TextArea
        ref={textAreaRef}
        value={commentValue}
        onChange={onChangeCommentValue}
        onKeyDown={preventKeydownEnter}
        placeholder={isReply ? "답글을 입력하세요" : "댓글을 입력하세요."}
        rows={1}
      />
      <CommentSubmitBtn
        type='button'
        onClick={onSubmitComment}
        disabled={
          type === "edit"
            ? commentValue === initalvalue || !commentValue
            : !commentValue
        }
      />
    </CommentTextAreaInner>
  );
}
