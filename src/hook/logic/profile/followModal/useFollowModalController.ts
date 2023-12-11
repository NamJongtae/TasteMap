import { useEffect, useRef } from "react";
import { useHistoryMobileBackBtn } from "../../../useHistoryMobileBackBtn";
import useOpenFollowerModal from "./useOpenFollowerModal";
import useOpenFollowingModal from "./useOpenFollowingModal";
import useCloseFollowerModal from "./useCloseFollowerModal";
import useCloseFollowingModal from "./useCloseFollowingModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

export const useFollowModalController = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const followListRef = useRef<HTMLUListElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const firstItemLinkRef = useRef<HTMLAnchorElement>(null);
  const lastItemFollowBtnRef = useRef<HTMLButtonElement>(null);

  const isOpenFollowerModal = useSelector(
    (state: RootState) => state.user.isOpenFollowerModal
  );
  const isOpenFollowingModal = useSelector(
    (state: RootState) => state.user.isOpenFollowingModal
  );

  const { openFollowerModalHandler } = useOpenFollowerModal();
  const { openFollowingModalHandler } = useOpenFollowingModal();
  const {
    closeFollowerModalHandler,
    closeFollowerModalAnimationHandler,
    closeFollowerModalMobileBackBtn
  } = useCloseFollowerModal();
  const {
    closeFollowingModalHandler,
    closeFollowingModalAnimdationHandler,
    closeFollowingModalMobileBackBtn
  } = useCloseFollowingModal();

  const closeOpenedModal = () => {
    if (isOpenFollowerModal) {
      closeFollowerModalHandler();
    }
    if (isOpenFollowingModal) {
      closeFollowingModalHandler();
    }
  };

  const closeOpendModalMobileBackBtn = () => {
    if (isOpenFollowerModal) {
      closeFollowerModalMobileBackBtn(modalRef);
    }
    if (isOpenFollowingModal) {
      closeFollowingModalMobileBackBtn(modalRef);
    }
  };

  useHistoryMobileBackBtn({ handlePopStateCb: closeOpendModalMobileBackBtn });

  useEffect(() => {
    return () => {
      closeOpenedModal();
    };
  }, []);

  return {
    modalRef,
    followListRef,
    closeBtnRef,
    firstItemLinkRef,
    lastItemFollowBtnRef,
    openFollowerModalHandler,
    openFollowingModalHandler,
    closeFollowerModalAnimationHandler: () =>
      closeFollowerModalAnimationHandler(modalRef),
    closeFollowingModalAnimdationHandler: () =>
      closeFollowingModalAnimdationHandler(modalRef)
  };
};
