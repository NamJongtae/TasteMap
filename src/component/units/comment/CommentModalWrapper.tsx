import React from "react";
import CommentModal from "./commentModal/CommentModal";
import { useCommentModalController } from "../../../hook/logic/comment/useCommentModalController";
import { ICommentData } from "../../../types/apiTypes";
import { PortalModal } from "../../commons/UI/portalModal/PortalModal";

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
}

interface IModalProps {
  isOpenCommentModal: boolean;
  isOpenReplyModal: boolean;
  closeCommentModal: () => void;
  closeMoveLeftReplyModal: () => void;
  openReplyModalHandler: (data: ICommentData) => void;
  closeNoHistoryBackModalHandler: () => void;
  commentModalRef: React.RefObject<HTMLDivElement>;
  replyModalRef: React.RefObject<HTMLDivElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
  postType: "HOME" | "FEED" | "PROFILE";
}

const ModalPortal = ({
  isOpenCommentModal,
  isOpenReplyModal,
  closeCommentModal,
  closeMoveLeftReplyModal,
  openReplyModalHandler,
  closeNoHistoryBackModalHandler,
  commentModalRef,
  replyModalRef,
  closeBtnRef,
  textareaRef,
  firstItemLinkRef,
  postType
}: IModalProps) => {
  return (
    <>
      {isOpenCommentModal && (
        <CommentModal
          commentModalRef={commentModalRef}
          replyModalRef={replyModalRef}
          isReply={false}
          closeCommentModal={closeCommentModal}
          closeMoveLeftReplyModal={closeMoveLeftReplyModal}
          closeBtnRef={closeBtnRef}
          textareaRef={textareaRef}
          firstItemLinkRef={firstItemLinkRef}
          postType={postType}
          openReplyModalHandler={openReplyModalHandler}
          closeNoHistoryBackModalHandler={closeNoHistoryBackModalHandler}
        />
      )}
      {isOpenReplyModal && (
        <CommentModal
          commentModalRef={commentModalRef}
          replyModalRef={replyModalRef}
          isReply={true}
          closeCommentModal={closeCommentModal}
          closeMoveLeftReplyModal={closeMoveLeftReplyModal}
          closeBtnRef={closeBtnRef}
          textareaRef={textareaRef}
          firstItemLinkRef={firstItemLinkRef}
          postType={postType}
          openReplyModalHandler={openReplyModalHandler}
          closeNoHistoryBackModalHandler={closeNoHistoryBackModalHandler}
        />
      )}
    </>
  );
};

export default function CommentModalWrapper({ postType }: IProps) {
  const {
    isOpenCommentModal,
    isOpenReplyModal,
    closeCommentModal,
    closeMoveLeftReplyModal,
    openReplyModalHandler,
    closeAllModalHandler,
    closeNoHistoryBackModalHandler,
    commentModalRef,
    replyModalRef,
    closeBtnRef,
    textareaRef,
    firstItemLinkRef
  } = useCommentModalController({ postType });

  return (
    <PortalModal closeModalHandler={closeAllModalHandler} targetId='modal-root'>
      <ModalPortal
        isOpenCommentModal={isOpenCommentModal}
        isOpenReplyModal={isOpenReplyModal}
        closeCommentModal={closeCommentModal}
        closeMoveLeftReplyModal={closeMoveLeftReplyModal}
        openReplyModalHandler={openReplyModalHandler}
        closeNoHistoryBackModalHandler={closeNoHistoryBackModalHandler}
        commentModalRef={commentModalRef}
        replyModalRef={replyModalRef}
        closeBtnRef={closeBtnRef}
        textareaRef={textareaRef}
        firstItemLinkRef={firstItemLinkRef}
        postType={postType}
      />
    </PortalModal>
  );
}
