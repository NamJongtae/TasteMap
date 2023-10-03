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
import { resolveWebp } from "../../../../library/webpSupport";
import { IUserData } from "../../../../api/apiType";
interface IPros {
  isReply: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
  userData: IUserData;
  parentCommentId: string;
  closeCommentModal: () => void;
}
export default function CommentModalUI({
  isReply,
  modalRef,
  userData,
  parentCommentId,
  closeCommentModal
}: IPros) {
  return (
    <CommentModalWrapper ref={modalRef} isReply={isReply}>
      <ModalTitleBar>
        <ModalTitle>{isReply ? "답글" : "댓글"}</ModalTitle>
      </ModalTitleBar>
      <CommentList isReply={isReply} />
      <CommentTextAreaWrapper>
        <UserImg
          src={userData.photoURL}
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
        />
      </CommentTextAreaWrapper>

      <CloseBtn
        type='button'
        aria-label='닫기'
        onClick={closeCommentModal}
        isReply={isReply}
      />
    </CommentModalWrapper>
  );
}
