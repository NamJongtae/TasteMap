import React, { SyntheticEvent } from "react";
import CommentList from "./commentList/CommentList";
import CommentTextarea from "./textAreaField/commentTextArea/CommentTextarea";
import { optModalTabFocus } from "../../../../library/optModalTabFocus";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { resolveWebp } from "../../../../library/resolveWebp";
import { ICommentData } from "../../../../api/apiType";
import {
  CloseBtn,
  CommentTextAreaWrapper,
  ModalTitle,
  ModalTitleBar,
  ModalWrapper,
  UserImg
} from "./commentModal.styles";

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
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
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
      <CommentTextAreaWrapper>
        <UserImg
          src={myInfo.photoURL}
          alt='프로필 이미지'
          onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = resolveWebp(
              "/assets/webp/icon-defaultProfile.webp",
              "svg"
            );
          }}
        />
        <CommentTextarea
          initalvalue=''
          isReply={isReply}
          textareaType={isReply ? "reply" : "write"}
          commentId={parentCommentId}
          textareaRef={textareaRef}
          closeBtnRef={closeBtnRef}
          postType={postType}
        />
      </CommentTextAreaWrapper>
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
