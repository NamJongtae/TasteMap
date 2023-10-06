import React from "react";
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
import CommentTextArea from "./CommentTextArea.container";
import { ICommentData, IReplyData, IUserData } from "../../../../api/apiType";
import { UserImg } from "../userInfo.styles";
import { isMobile } from 'react-device-detect';
interface IProps {
  data: ICommentData | IReplyData;
  userData: IUserData;
  isEdit: boolean;
  isReply: boolean;
  onClickEdit: () => void;
  onClickReply: () => void;
  isOpenReplyModal: boolean;
  formattedDate: string | undefined;
  onClickRemove: () => void;
  onClickReport: () => void;
  onClickProfileLink: () => void;
}
export default function CommentItemUI({
  data,
  userData,
  isEdit,
  isReply,
  onClickEdit,
  onClickReply,
  formattedDate,
  onClickRemove,
  onClickReport,
  onClickProfileLink
}: IProps) {
  return (
    <>
      {!data.isBlock && (
        <CommentLi>
          <UserLink
            to={`/profile/${data.uid}`}
            replace={isMobile}
            onClick={onClickProfileLink}
          >
            <UserImg
              src={data.photoURL || userData.photoURL}
              alt='유저 프로필 이미지'
            />
            <UserName>{data.displayName || userData.displayName}</UserName>
          </UserLink>
          {isEdit ? (
            <CommentTextArea
              initalvalue={data.content}
              isReply={isReply}
              textAreaType={"edit"}
              commentId={
                isReply
                  ? (data as IReplyData).parentCommentId
                  : (data as ICommentData).commentId
              }
              replyId={(data as IReplyData).replyId}
              closeTextArea={onClickEdit}
            />
          ) : (
            <CommentText>{data.content}</CommentText>
          )}
          <CommentBottom>
            {isEdit ? (
              <CommentBtn
                onClick={isEdit ? onClickEdit : onClickReply}
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
                  <CommentBtn onClick={onClickReply}>답글</CommentBtn>
                )}
                {userData.uid === data.uid ? (
                  <>
                    <CommentBtn onClick={onClickEdit}>수정</CommentBtn>
                    <CommentBtn onClick={onClickRemove}>삭제</CommentBtn>
                  </>
                ) : (
                  <CommentBtn onClick={onClickReport}>신고</CommentBtn>
                )}
              </>
            )}
          </CommentBottom>
          {!isReply && (data as ICommentData).replyCount !== 0 && (
            <ReplyCountBtn onClick={onClickReply}>
              답글 {(data as ICommentData).replyCount}개
            </ReplyCountBtn>
          )}
        </CommentLi>
      )}
    </>
  );
}
