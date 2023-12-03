import React from "react";
import { ICommentData, IReplyData } from "../../../api/apiType";
import { useCommentItem } from "../../../hook/logic/comment/useCommentItem";
import {
  CommentBottom,
  CommentBtn,
  CommentDate,
  CommentLi,
  CommentText,
  ReplyCountBtn,
  UserLink,
  UserName
} from "./comment.styles";
import { UserImg } from "../post/userInfo.styles";
import { isMobile } from "react-device-detect";
import { optModalTabFocus } from "../../../library/optModalTabFocus";
import CommentTextArea from "./CommentTextarea";
interface IProps {
  data: ICommentData | IReplyData;
  idx: number;
  isReply: boolean;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
  postType: "HOME" | "FEED" | "PROFILE";
}
export default function CommentItem({
  data,
  idx,
  isReply,
  closeBtnRef,
  textareaRef,
  firstItemLinkRef,
  postType
}: IProps) {
  const {
    myInfo,
    isEdit,
    openEditTextareaHandler,
    closeEditTextareaHandler,
    openReplyModalHandler,
    closeReplyModalHanlder,
    formattedDate,
    removeHandler,
    reportHandler,
    closeModalAndMoveToProfile
  } = useCommentItem({ data, postType, isReply });
  return (
    <>
      {!data.isBlock && (
        <CommentLi>
          <UserLink
            to={`/profile/${data.uid}`}
            replace={isMobile}
            onClick={closeModalAndMoveToProfile}
            ref={idx === 0 ? firstItemLinkRef : null}
            onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
              if (idx === 0) {
                optModalTabFocus(e, closeBtnRef.current);
              }
            }}
          >
            <UserImg
              src={data.photoURL || myInfo.photoURL}
              alt='유저 프로필 이미지'
            />
            <UserName>{data.displayName || myInfo.displayName}</UserName>
          </UserLink>
          {isEdit ? (
            <CommentTextArea
              initalvalue={data.content}
              isReply={isReply}
              textareaType={"edit"}
              commentId={
                isReply
                  ? (data as IReplyData).parentCommentId
                  : (data as ICommentData).commentId
              }
              replyId={(data as IReplyData).replyId}
              closeTextarea={closeEditTextareaHandler}
              closeBtnRef={closeBtnRef}
              textareaRef={textareaRef}
              postType={postType}
            />
          ) : (
            <CommentText>{data.content}</CommentText>
          )}
          <CommentBottom>
            {isEdit ? (
              <CommentBtn
                onClick={
                  isEdit ? closeEditTextareaHandler : closeReplyModalHanlder
                }
              >
                취소
              </CommentBtn>
            ) : (
              <>
                {data.createdAt && (
                  <CommentDate
                    dateTime={new Date(
                      data.createdAt?.seconds * 1000
                    ).toISOString()}
                  >
                    {formattedDate}
                  </CommentDate>
                )}
                {!isReply && (
                  <CommentBtn onClick={openReplyModalHandler}>답글</CommentBtn>
                )}
                {myInfo.uid === data.uid ? (
                  <>
                    <CommentBtn onClick={openEditTextareaHandler}>
                      수정
                    </CommentBtn>
                    <CommentBtn onClick={removeHandler}>삭제</CommentBtn>
                  </>
                ) : (
                  <CommentBtn onClick={reportHandler}>신고</CommentBtn>
                )}
              </>
            )}
          </CommentBottom>
          {!isReply && (data as ICommentData).replyCount !== 0 && (
            <ReplyCountBtn onClick={openReplyModalHandler}>
              답글 {(data as ICommentData).replyCount}개
            </ReplyCountBtn>
          )}
        </CommentLi>
      )}
    </>
  );
}
