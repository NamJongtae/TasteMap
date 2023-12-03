import React, { SyntheticEvent } from "react";
import { useSupportedWebp } from "../../../hook/useSupportedWebp";
import { useCommentModal } from "../../../hook/logic/comment/useCommentModal";
import CommentList from "./CommentList";
import CommentTextarea from "./CommentTextarea";
import {
  CloseBtn,
  CommentModalWrapper,
  CommentTextAreaWrapper,
  ModalTitle,
  ModalTitleBar,
  UserImg
} from "./comment.styles";
import { optModalTabFocus } from "../../../library/optModalTabFocus";

interface IProps {
  commentModalRef: React.RefObject<HTMLDivElement>;
  replyModalRef: React.RefObject<HTMLDivElement>;
  isReply: boolean;
  postType: "HOME" | "FEED" | "PROFILE";
}

export default function CommentModal({
  commentModalRef,
  replyModalRef,
  isReply,
  postType
}: IProps) {
  const { isWebpSupported, resolveWebp } = useSupportedWebp();
  const {
    myInfo,
    parentCommentId,
    closeCommentModal,
    closeBtnRef,
    textareaRef,
    firstItemLinkRef
  } = useCommentModal({
    commentModalRef,
    replyModalRef,
    isReply,
    postType
  });

  return (
    <CommentModalWrapper
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
