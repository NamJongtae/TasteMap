import React from "react";
import CommentList from "./commentList/CommentList";
import { optModalTabFocus } from "../../../../library/optModalTabFocus";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { ICommentData } from "../../../../api/apiType";
import {
  CloseBtn,
  ModalTitle,
  ModalTitleBar,
  ModalWrapper
} from "./commentModal.styles";
import TextAreaFormField from "./textAreaFormField/TextAreaFormField";

interface IProps {
  closeCommentModal: () => void;
  closeMoveLeftReplyModal: () => void;
  commentModalRef: React.RefObject<HTMLDivElement>;
  replyModalRef: React.RefObject<HTMLDivElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
  isReply: boolean;
  postType: "HOME" | "FEED" | "PROFILE";
  openReplyModalHandler: (data: ICommentData) => void;
  closeNoHistoryBackModalHandler: () => void;
}

export default function CommentModal({
  closeCommentModal,
  closeMoveLeftReplyModal,
  commentModalRef,
  replyModalRef,
  closeBtnRef,
  textareaRef,
  firstItemLinkRef,
  isReply,
  postType,
  openReplyModalHandler,
  closeNoHistoryBackModalHandler
}: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );
  const parentCommentId = useSelector(
    (state: RootState) => state.reply.parentCommentId
  );

  return (
    <ModalWrapper
      ref={isReply ? replyModalRef : commentModalRef}
      isReply={isReply}
    >
      <ModalTitleBar>
        <ModalTitle>{isReply ? "답글" : "댓글"}</ModalTitle>
      </ModalTitleBar>

      <CommentList
        isReply={isReply}
        closeBtnRef={closeBtnRef}
        textareaRef={textareaRef}
        firstItemLinkRef={firstItemLinkRef}
        postType={postType}
        openReplyModalHandler={openReplyModalHandler}
        closeNoHistoryBackModalHandler={closeNoHistoryBackModalHandler}
      />

      <TextAreaFormField
        isReply={isReply}
        postType={"HOME"}
        textareaRef={textareaRef}
        closeBtnRef={closeBtnRef}
        commentId={parentCommentId}
      />

      <CloseBtn
        type='button'
        aria-label='닫기'
        onClick={isReply ? closeMoveLeftReplyModal : closeCommentModal}
        isReply={isReply}
        ref={closeBtnRef}
        onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
          optModalTabFocus(e, textareaRef.current, firstItemLinkRef.current);
        }}
        $isWebpSupported={isWebpSupported}
      />
    </ModalWrapper>
  );
}
