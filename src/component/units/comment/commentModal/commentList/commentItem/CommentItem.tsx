import React from "react";
import { ICommentData, IReplyData } from "../../../../../../api/apiType";
import { CommentLi, ReplyCountBtn } from "./commentItem.styles";
import { useEditTextAreaController } from "../../../../../../hook/logic/comment/commentItem/useEditTextAreaController";
import CommentContent from "./commentContent/CommentContent";
import CommentBottom from "./commentBottom/CommentBottom";
import { optModalTabFocus } from "../../../../../../library/optModalTabFocus";
import UserInfo from "../../../../../commons/userInfo/UserInfo";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import { isMobile } from "react-device-detect";
interface IProps {
  data: ICommentData | IReplyData;
  idx: number;
  isReply: boolean;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
  postType: "HOME" | "FEED" | "PROFILE";
  openReplyModalHandler: (data: ICommentData) => void;
  closeNoHistoryBackModalHandler: () => void;
}
export default function CommentItem({
  data,
  idx,
  isReply,
  closeBtnRef,
  textareaRef,
  firstItemLinkRef,
  postType,
  openReplyModalHandler,
  closeNoHistoryBackModalHandler
}: IProps) {
  const { isEdit, openEditTextareaHandler, closeEditTextareaHandler } =
    useEditTextAreaController();
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  return (
    <>
      {!data.isBlock && (
        <CommentLi>
          <UserInfo
            userData={{
              displayName: data.displayName || myInfo.displayName,
              uid: data.uid || myInfo.uid,
              photoURL: data.photoURL || myInfo.photoURL
            }}
            onClick={closeNoHistoryBackModalHandler}
            replace={isMobile}
            userLinkRef={firstItemLinkRef}
            onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
              if (idx === 0) {
                optModalTabFocus(e, closeBtnRef.current);
              }
            }}
          />

          <CommentContent
            isEdit={isEdit}
            isReply={isReply}
            data={data}
            closeEditTextareaHandler={closeEditTextareaHandler}
            closeBtnRef={closeBtnRef}
            textareaRef={textareaRef}
            postType={postType}
          />

          <CommentBottom
            postType={postType}
            isEdit={isEdit}
            isReply={isReply}
            data={data}
            openEditTextareaHandler={openEditTextareaHandler}
            closeEditTextareaHandler={closeEditTextareaHandler}
            openReplyModalHandler={openReplyModalHandler}
          />

          {!isReply && (data as ICommentData).replyCount !== 0 && (
            <ReplyCountBtn
              onClick={() => openReplyModalHandler(data as ICommentData)}
            >
              답글 {(data as ICommentData).replyCount}개
            </ReplyCountBtn>
          )}
        </CommentLi>
      )}
    </>
  );
}
