import React from "react";
import ReactDOM from "react-dom";
import CommentModal from "./CommentModal";
import { Modal } from "../../commons/UI/Modal";
import { useCommentWrapper } from "../../../hook/logic/comment/useCommentWrapper";

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
}

interface IModalProps {
  closeCommentModal: () => void;
  isOpenCommentModal: boolean;
  isOpenReplyModal: boolean;
  commentModalRef: React.RefObject<HTMLDivElement>;
  replyModalRef: React.RefObject<HTMLDivElement>;
  postType: "HOME" | "FEED" | "PROFILE";
}

const ModalPortal = ({
  closeCommentModal,
  isOpenCommentModal,
  isOpenReplyModal,
  commentModalRef,
  replyModalRef,
  postType
}: IModalProps) => {
  return (
    <Modal closeModalHanlder={closeCommentModal}>
      {isOpenCommentModal && (
        <CommentModal
          commentModalRef={commentModalRef}
          replyModalRef={replyModalRef}
          isReply={false}
          postType={postType}
        />
      )}
      {isOpenReplyModal && (
        <CommentModal
          commentModalRef={commentModalRef}
          replyModalRef={replyModalRef}
          isReply={true}
          postType={postType}
        />
      )}
    </Modal>
  );
};

export default function CommentModalWrapper({ postType }: IProps) {
  const {
    isOpenCommentModal,
    isOpenReplyModal,
    closeCommentModal,
    commentModalRef,
    replyModalRef
  } = useCommentWrapper();

  return (
    <>
      {ReactDOM.createPortal(
        <ModalPortal
          closeCommentModal={closeCommentModal}
          isOpenCommentModal={isOpenCommentModal}
          isOpenReplyModal={isOpenReplyModal}
          commentModalRef={commentModalRef}
          replyModalRef={replyModalRef}
          postType={postType}
        />,
        document.getElementById("modal-root") as HTMLDivElement
      )}
    </>
  );
}
