import React, { useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {
  CloseBtn,
  Dim,
  FollowModalWrapper,
  ModalTitle,
  ModalTitleBar,
  Wrapper
} from "./followModal.styles";
import FollowList from "./FollowList";
import { isMobile } from "react-device-detect";
import { optModalTabFocus } from "../../../library/optModalTabFocus";
import { useSupportedWebp } from '../../../hook/useSupportedWebp';

interface IProps {
  isFollower: boolean;
  closeFollowersModalHandler: () => void;
  closeFollowingModalHandler: () => void;
}

interface IModalProps {
  modalRef: React.RefObject<HTMLDivElement>;
  followListRef: React.RefObject<HTMLUListElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
  lastItemFollowBtnRef: React.RefObject<HTMLButtonElement>;
  closeModal: () => void;
  isFollower: boolean;
  closeFollowersModalHandler: () => void;
  closeFollowingModalHandler: () => void;
  isWebpSupported: boolean | null;
}

const Modal = ({
  modalRef,
  followListRef,
  closeBtnRef,
  firstItemLinkRef,
  lastItemFollowBtnRef,
  closeModal,
  isFollower,
  closeFollowersModalHandler,
  closeFollowingModalHandler,
  isWebpSupported
}: IModalProps) => {
  return (
    <Wrapper>
      <Dim
        onClick={() => {
          if (modalRef.current) {
            const animation = window
              .getComputedStyle(modalRef.current)
              .getPropertyValue("animation");
            if (!animation.includes("FollowModalmoveUp")) {
              return;
            }
          }
          closeModal();
        }}
      ></Dim>
      <FollowModalWrapper
        ref={modalRef}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.keyCode === 27) {
            closeModal();
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
          closeFollowersModalHandler={closeFollowersModalHandler}
          closeFollowingModalHandler={closeFollowingModalHandler}
        />
        <CloseBtn
          onClick={closeModal}
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
    </Wrapper>
  );
};
export default function FollowModal({
  isFollower,
  closeFollowersModalHandler,
  closeFollowingModalHandler
}: IProps) {
  const { isWebpSupported } = useSupportedWebp();
  const modalRef = useRef<HTMLDivElement>(null);
  const followListRef = useRef<HTMLUListElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const firstItemLinkRef = useRef<HTMLAnchorElement>(null);
  const lastItemFollowBtnRef = useRef<HTMLButtonElement>(null);

  const closeModal = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.style.animation = "FollowModalmoveDown 1s";
      setTimeout(() => {
        if (isMobile) {
          history.back();
        }
        if (isFollower) {
          closeFollowersModalHandler();
        } else {
          closeFollowingModalHandler();
        }
      }, 700);
    }
  }, [isFollower, isMobile]);

  // 뒤로가기 버튼을 눌러도 현재 페이지가 유지됨
  useEffect(() => {
    if (isMobile) {
      window.history.pushState(null, "", window.location.href);
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      const handlePopState = () => {
        if (modalRef.current) {
          modalRef.current.style.animation = "FollowModalmoveDown 1s";
          setTimeout(() => {
            if (isFollower) {
              closeFollowersModalHandler();
            } else {
              closeFollowingModalHandler();
            }
          }, 700);
        }
      };

      window.onpopstate = handlePopState;

      return () => {
        // 컴포넌트가 언마운트될 때 이벤트 핸들러를 삭제
        window.onpopstate = null;
      };
    }
  }, []);

  return (
    <>
      {ReactDOM.createPortal(
        <Modal
          modalRef={modalRef}
          followListRef={followListRef}
          closeBtnRef={closeBtnRef}
          firstItemLinkRef={firstItemLinkRef}
          lastItemFollowBtnRef={lastItemFollowBtnRef}
          closeModal={closeModal}
          isFollower={isFollower}
          closeFollowersModalHandler={closeFollowersModalHandler}
          closeFollowingModalHandler={closeFollowingModalHandler}
          isWebpSupported={isWebpSupported}
        />,
        document.getElementById("modal-root") as HTMLDivElement
      )}
    </>
  );
}
