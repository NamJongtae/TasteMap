import { useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
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
  const { closeFollowerModalHandler } = useCloseFollowerModal();
  const { closeFollowingModalHandler } = useCloseFollowingModal();

  const closeFollowerModalAnimationHandler = () => {
    if (modalRef.current) {
      modalRef.current.style.animation = "FollowModalmoveDown 1s";
      setTimeout(() => {
        if (isMobile) {
          history.back();
        }
        closeFollowerModalHandler();
      }, 700);
    }
  };

  const closeFollowingModalAnimdationHandler = () => {
    if (modalRef.current) {
      modalRef.current.style.animation = "FollowModalmoveDown 1s";
      setTimeout(() => {
        if (isMobile) {
          history.back();
        }
        closeFollowingModalHandler();
      }, 700);
    }
  };

  const closeOpenedModal = () => {
    if (isOpenFollowerModal) {
      closeFollowerModalHandler();
    }
    if (isOpenFollowingModal) {
      closeFollowingModalHandler();
    }
  };

  useHistoryMobileBackBtn({ handlePopStateCb: closeOpenedModal });

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
    closeFollowerModalAnimationHandler,
    closeFollowingModalAnimdationHandler
  };
};
