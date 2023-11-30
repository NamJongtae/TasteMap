import React, { SyntheticEvent } from "react";
import {
  CloseBtn,
  CommentModalWrapper,
  CommentTextAreaWrapper,
  ModalTitle,
  ModalTitleBar,
  UserImg
} from "./comment.styles";
import CommentList from "./CommentList.container";
import CommentTextArea from "./CommentTextArea.container";
import { IUserData } from "../../../../api/apiType";
import { optModalTabFocus } from "../../../../library/optModalTabFocus";
interface IPros {
  isReply: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
  myInfo: IUserData;
  parentCommentId: string;
  closeCommentModal: () => void;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
  postType: "HOME" | "FEED" | "PROFILE"
  isWebpSupported: boolean | null;
  resolveWebp: (img: string, fallbackExt: string) => string;
}
export default function CommentModalUI({
  isReply,
  modalRef,
  myInfo,
  parentCommentId,
  closeCommentModal,
  closeBtnRef,
  textareaRef,
  firstItemLinkRef,
  postType,
  isWebpSupported,
  resolveWebp,
}: IPros) {
  return (
    <CommentModalWrapper ref={modalRef} isReply={isReply}>
      <ModalTitleBar>
        <ModalTitle>{isReply ? "답글" : "댓글"}</ModalTitle>
      </ModalTitleBar>

      <CommentList
        isReply={isReply}
        closeBtnRef={closeBtnRef}
        textareaRef={textareaRef}
        firstItemLinkRef={firstItemLinkRef}
        postType={postType}
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
        <CommentTextArea
          initalvalue=''
          isReply={isReply}
          textAreaType={isReply ? "reply" : "write"}
          commentId={parentCommentId}
          textareaRef={textareaRef}
          closeBtnRef={closeBtnRef}
          postType={postType}
        />
      </CommentTextAreaWrapper>
      <CloseBtn
        type='button'
        aria-label='닫기'
        onClick={closeCommentModal}
        isReply={isReply}
        ref={closeBtnRef}
        onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
          optModalTabFocus(e, textareaRef.current, firstItemLinkRef.current);
        }}
        $isWebpSupported={isWebpSupported}
      />
    </CommentModalWrapper>
  );
}
