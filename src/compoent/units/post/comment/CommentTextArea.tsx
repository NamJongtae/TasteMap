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
  replySlice,
  thunkFetchAddReply,
  thunkFetchEditReply
} from "../../../../slice/replySlice";
import { ICommentData, IKnownError, IReplyData } from "../../../../api/apiType";

interface IProps {
  textAreaType: "write" | "edit" | "reply";
  isReply: boolean;
  initalvalue: string;
  commentId?: string;
  replyId?: string;
  closeTextArea?: () => void;
}

export default function CommentTextArea({
  textAreaType,
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
  const replyListData = useSelector(
    (state: RootState) => state.reply.replyListData
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

  const commentError = (type: "noPost" | "noComment") => {
    if (type === "noPost") {
      // 댓글 모달창 닫기
      document.body.style.overflow = "auto";
      dispatch(commentSlice.actions.setIsOpenCommentModal(false));

      // 해당 게시물 삭제
      const newData = [...postListData].filter((item) => item.id !== postId);
      dispatch(postSlice.actions.setPostListData(newData));
    } else if (type === "noComment") {
      // 해당 댓글 삭제
      const newCommentListData = [...commentListData].filter(
        (item) => item.commentId !== commentId
      );
      dispatch(commentSlice.actions.setCommentListData(newCommentListData));

      // 답글 모달창 닫기
      dispatch(commentSlice.actions.setIsOpenCommentModal(false));
    }
  };

  const replyError = (type: "noReply" | "noPost" | "noComment") => {
    if (type === "noReply") {
      // 해당 답글 삭제
      const newReplyData = [...replyListData].filter(
        (item) => item.replyId !== replyId
      );
      dispatch(replySlice.actions.setReplyListData(newReplyData));
    } else if (type === "noComment") {
      // 해당 댓글 삭제
      const newCommentListData = [...commentListData].filter(
        (item) => item.commentId !== commentId
      );
      dispatch(commentSlice.actions.setCommentListData(newCommentListData));

      // 답글 모달창 닫기
      dispatch(replySlice.actions.setIsOpenReplyModal(false));
    } else if (type === "noPost") {
      // 댓글 모달창 닫기
      document.body.style.overflow = "auto";
      dispatch(commentSlice.actions.setIsOpenCommentModal(false));
      // 답글 모달창 닫기
      dispatch(replySlice.actions.setIsOpenReplyModal(false));

      // 게시물 삭제
      const newData = [...postListData].filter((item) => item.id !== postId);
      dispatch(postSlice.actions.setPostListData(newData));
    }
  };

  const onSubmitComment = () => {
    switch (textAreaType) {
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
            reportCount: 0,
            replyCount: 0,
            reportUidList: []
          };
          dispatch(thunkFetchAddComment(commnetData)).then((result) => {
            if (result.payload) {
              // 추가할 댓글의 게시물이 유효하다면 postData 수정 로직 수행
              if ((result.payload as ICommentData).commentId) {
                setCommentValue("");
              } else if (
                // 추가할 댓글의 게시물이 유효하지 않다면 댓글 모달창을 닫고 해당 게시물 삭제 처리
                (result.payload as IKnownError).message.includes(
                  "게시물이 존재하지 않습니다."
                )
              ) {
                commentError("noPost");
              }
            }
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
            (async () => {
              await dispatch(thunkFetchEditComment(commentEditData)).then(
                (result) => {
                  if (result.payload) {
                    // 수정할 댓글의 게시물이 유효하다면 textarear 닫기
                    if (
                      (
                        result.payload as Pick<
                          ICommentData,
                          "content" | "commentId"
                        >
                      ).commentId
                    ) {
                      if (closeTextArea) closeTextArea();
                    } else if (
                      // 수정할 댓글이 존재하지 않는다면 해당 댓글 삭제, 게시물의 댓글 카운터 감소 처리
                      (result.payload as IKnownError).message ===
                      "댓글이 존재하지 않습니다."
                    ) {
                      commentError("noComment");
                    } else if (
                      // 수정할 댓글의 게시물이 유효하지 않다면 댓글 모달창을 닫고 해당 게시물 삭제 처리
                      (result.payload as IKnownError).message ===
                      "게시물이 존재하지 않습니다."
                    ) {
                      commentError("noPost");
                    }
                  }
                }
              );
            })();
          } else {
            // 타입 가드
            if (!replyId || !commentId) return;
            const replyEditData = {
              replyId,
              parentCommentId: commentId,
              content: commentValue,
              postId: postId
            };
            (async () => {
              dispatch(thunkFetchEditReply(replyEditData)).then((result) => {
                if (result.payload) {
                  // 수정할 답글의 댓글, 게시물이 유효하다면 textarear 닫기
                  if (
                    (
                      result.payload as Pick<
                        IReplyData,
                        "content" | "parentCommentId" | "replyId"
                      >
                    ).replyId
                  ) {
                    if (closeTextArea) closeTextArea();
                  } else if (
                    // 수정할 답글이 존재하지 않는다면 해당 답글 삭제 댓글 답글 카운터 감소 처리
                    (result.payload as IKnownError).message ===
                    "답글이 존재하지 않습니다."
                  ) {
                    replyError("noReply");
                  } else if (
                    // 수정할 답글의 댓글이 존재하지 않는다면 답글 모달창울 닫고 해당 댓글 삭제 처리 게시물 댓글 카운터 감소 처리
                    (result.payload as IKnownError).message ===
                    "댓글이 존재하지 않습니다."
                  ) {
                    replyError("noComment");
                  } else if (
                    // 수정할 답글의 게시물이 유효하지 않다면 댓글/답글 모달창을 닫고 해당 게시물 삭제
                    (result.payload as IKnownError).message ===
                    "게시물이 존재하지 않습니다."
                  ) {
                    replyError("noPost");
                  }
                }
              });
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
            isBlock: false,
            reportCount: 0,
            reportUidList: []
          };

          dispatch(thunkFetchAddReply(replyData)).then((result) => {
            if (result.payload) {
              // 추가할 답글의 댓글이나 게시물이 유효하다면 commentListData 수정
              if (
                // 추가할 답글의 부모 댓글이 존재하지 않는다면 답글 모달창울 닫고 해당 댓글 삭제 처리 게시물 댓글 카운터 감소 처리
                (result.payload as IKnownError).message ===
                "댓글이 존재하지 않습니다."
              ) {
                replyError("noComment");
              } else if (
                // 추가할 답글의 게시물이 존재하지 않다면 댓글 모달창을 닫고 해당 게시물 삭제 처리
                (result.payload as IKnownError).message ===
                "게시물이 존재하지 않습니다."
              ) {
                replyError("noPost");
              }
            }
          });
          setCommentValue("");
        }
        break;

      default:
        return;
    }
  };

  return (
    <CommentTextAreaInner textAreaType={textAreaType}>
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
          textAreaType === "edit"
            ? commentValue === initalvalue || !commentValue
            : !commentValue
        }
      />
    </CommentTextAreaInner>
  );
}
