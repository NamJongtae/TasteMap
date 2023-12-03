import React from "react";
import ReactDOM from "react-dom";
import {
  CloseBtn,
  FollowModalWrapper,
  ModalTitle,
  ModalTitleBar
} from "./followModal.styles";
import FollowList from "./FollowList";
import { optModalTabFocus } from "../../../library/optModalTabFocus";
import { useSupportedWebp } from "../../../hook/useSupportedWebp";
import { Modal } from "../../../component/commons/UI/Modal";
import { useFollowModal } from "../../../hook/logic/followModal/useFollowModal";

interface IProps {
  isFollower: boolean;
}

interface IModalProps {
  modalRef: React.RefObject<HTMLDivElement>;
  followListRef: React.RefObject<HTMLUListElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
  lastItemFollowBtnRef: React.RefObject<HTMLButtonElement>;
  closAndAnimationeModal: () => void;
  isFollower: boolean;
  isWebpSupported: boolean | null;
}

const ModalPortal = ({
  modalRef,
  followListRef,
  closeBtnRef,
  firstItemLinkRef,
  lastItemFollowBtnRef,
  closAndAnimationeModal,
  isFollower,
  isWebpSupported
}: IModalProps) => {
  return (
    <Modal closeModalHanlder={closAndAnimationeModal}>
      <FollowModalWrapper
        ref={modalRef}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.keyCode === 27) {
            closAndAnimationeModal();
          }
        }}
      >
        <ModalTitleBar>
          <ModalTitle>{isFollower ? "팔로워" : "팔로잉"}</ModalTitle>
        </ModalTitleBar>
        <FollowList
          isFollower={isFollower}
          followListRef={followListRef}
          closeBtnRef={closeBtnRef}
          firstItemLinkRef={firstItemLinkRef}
          lastItemFollowBtnRef={lastItemFollowBtnRef}
        />
        <CloseBtn
          onClick={closAndAnimationeModal}
          ref={closeBtnRef}
          onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
            optModalTabFocus(
              e,
              lastItemFollowBtnRef.current,
              firstItemLinkRef.current
            );
          }}
          $isWebpSupported={isWebpSupported}
        />
      </FollowModalWrapper>
    </Modal>
  );
};

export default function FollowModal({ isFollower }: IProps) {
  const { isWebpSupported } = useSupportedWebp();
  const {
    modalRef,
    followListRef,
    closeBtnRef,
    firstItemLinkRef,
    lastItemFollowBtnRef,
    closAndAnimationeModal
  } = useFollowModal({
    isFollower
  });
  return (
    <>
      {ReactDOM.createPortal(
        <ModalPortal
          modalRef={modalRef}
          followListRef={followListRef}
          closeBtnRef={closeBtnRef}
          firstItemLinkRef={firstItemLinkRef}
          lastItemFollowBtnRef={lastItemFollowBtnRef}
          closAndAnimationeModal={closAndAnimationeModal}
          isFollower={isFollower}
          isWebpSupported={isWebpSupported}
        />,
        document.getElementById("modal-root") as HTMLDivElement
      )}
    </>
  );
}
