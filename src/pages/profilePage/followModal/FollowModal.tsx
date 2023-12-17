import React from "react";
import {
  CloseBtn,
  FollowModalWrapper,
  ModalTitle,
  ModalTitleBar
} from "./followModal.styles";
import FollowList from "./followList/FollowList";
import { optModalTabFocus } from "../../../library/optModalTabFocus";
import { useSupportedWebp } from "../../../hook/useSupportedWebp";
import { PortalModal } from "../../../component/commons/UI/portalModal/PortalModal";
import { useFollowModalController } from "../../../hook/logic/profile/followModal/useFollowModalController";
import { IMyProfileData } from "../../../api/apiType";

interface IModalProps {
  myProfile: IMyProfileData;
  modalRef: React.RefObject<HTMLDivElement>;
  followListRef: React.RefObject<HTMLUListElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
  lastItemFollowBtnRef: React.RefObject<HTMLButtonElement>;
  closeFollowModalHandler: () => void;
  followModalType: "FOLLOWER" | "FOLLOWING";
  isWebpSupported: boolean | null;
}

const ModalPortal = ({
  myProfile,
  modalRef,
  followListRef,
  closeBtnRef,
  firstItemLinkRef,
  lastItemFollowBtnRef,
  closeFollowModalHandler,
  followModalType,
  isWebpSupported
}: IModalProps) => {
  return (
    <FollowModalWrapper
      ref={modalRef}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 27) {
          closeFollowModalHandler();
        }
      }}
    >
      <ModalTitleBar>
        <ModalTitle>
          {followModalType === "FOLLOWER" ? "팔로워" : "팔로잉"}
        </ModalTitle>
      </ModalTitleBar>
      <FollowList
        myProfile={myProfile}
        followModalType={followModalType}
        followListRef={followListRef}
        closeBtnRef={closeBtnRef}
        firstItemLinkRef={firstItemLinkRef}
        lastItemFollowBtnRef={lastItemFollowBtnRef}
      />
      <CloseBtn
        onClick={closeFollowModalHandler}
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
  );
};

interface IProps {
  myProfile: IMyProfileData;
  followModalType: "FOLLOWER" | "FOLLOWING";
}

export default function FollowModal({ myProfile, followModalType }: IProps) {
  const { isWebpSupported } = useSupportedWebp();

  const {
    modalRef,
    followListRef,
    closeBtnRef,
    firstItemLinkRef,
    lastItemFollowBtnRef,
    closeFollowerModalAnimationHandler,
    closeFollowingModalAnimdationHandler
  } = useFollowModalController();

  return (
    <PortalModal
      closeModalHandler={
        followModalType === "FOLLOWER"
          ? closeFollowerModalAnimationHandler
          : closeFollowingModalAnimdationHandler
      }
      targetId='modal-root'
    >
      <ModalPortal
        myProfile={myProfile}
        modalRef={modalRef}
        followListRef={followListRef}
        closeBtnRef={closeBtnRef}
        firstItemLinkRef={firstItemLinkRef}
        lastItemFollowBtnRef={lastItemFollowBtnRef}
        closeFollowModalHandler={
          followModalType === "FOLLOWER"
            ? closeFollowerModalAnimationHandler
            : closeFollowingModalAnimdationHandler
        }
        followModalType={followModalType}
        isWebpSupported={isWebpSupported}
      />
    </PortalModal>
  );
}
