import React, { useCallback, useEffect, useRef } from "react";
import {
  CloseBtn,
  Dim,
  FollowModalWrapper,
  ModalTitle,
  ModalTitleBar,
  Wrapper
} from "./followModal.styles";
import FollowList from "./FollowList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { userSlice } from "../../../slice/userSlice";
import { isMobile } from "react-device-detect";
import { optModalTabFocus } from "../../../library/optModalTabFocus";

interface IProps {
  isFollower: boolean;
}
export default function FollowModal({ isFollower }: IProps) {
  const dispatch = useDispatch<AppDispatch>();
  const modalRef = useRef<HTMLDivElement>(null);
  const followListRef = useRef<HTMLUListElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const firstItemLinkRef = useRef<HTMLAnchorElement>(null);
  const lastItemFollowBtnRef = useRef<HTMLButtonElement>(null);

  const closeModal = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.style.animation = "FollowModalmoveDown 1s";
      setTimeout(() => {
        document.body.style.overflow = "auto";
        if (isFollower) {
          dispatch(userSlice.actions.setIsOpenFollowerModal(false));
        } else {
          dispatch(userSlice.actions.setIsOpenFollowingModal(false));
        }
      }, 700);
      if (isMobile) {
        history.back();
      }
    }
  },[isFollower, isMobile]);

  // 뒤로가기 버튼을 눌러도 현재 페이지가 유지됨
  useEffect(() => {
    if (isMobile) {
      window.history.pushState(null, "", window.location.href);
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      const handlePopState = () => {
        closeModal();
      };

      window.onpopstate = handlePopState;

      return () => {
        // 컴포넌트가 언마운트될 때 이벤트 핸들러를 삭제
        window.onpopstate = null;
      };
    }
  }, []);

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
        />
      </FollowModalWrapper>
    </Wrapper>
  );
}
