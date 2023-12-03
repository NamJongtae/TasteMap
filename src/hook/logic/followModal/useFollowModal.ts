import { useCallback, useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { userSlice } from "../../../slice/userSlice";

interface IProps {
  isFollower: boolean;
}

export const useFollowModal = ({ isFollower }: IProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const followListRef = useRef<HTMLUListElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const firstItemLinkRef = useRef<HTMLAnchorElement>(null);
  const lastItemFollowBtnRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const closeFollowersModalHandler = () => {
    dispatch(userSlice.actions.setIsOpenFollowerModal(false));
  };

  const closeFollowingModalHandler = () => {
    dispatch(userSlice.actions.setIsOpenFollowingModal(false));
  };

  const closAndAnimationeModal = useCallback(() => {
    if (modalRef.current) {
      const animation = window
        .getComputedStyle(modalRef.current)
        .getPropertyValue("animation");
      if (!animation.includes("FollowModalmoveUp")) {
        return;
      }
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

  return {
    modalRef,
    followListRef,
    closeBtnRef,
    firstItemLinkRef,
    lastItemFollowBtnRef,
    closAndAnimationeModal
  };
};
