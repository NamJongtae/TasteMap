import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { useCallback } from "react";
import { userSlice } from "../../../../slice/userSlice";
import { isMobile } from "react-device-detect";

export const useCloseProfileUpdateModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const closeProfileUpdateModalHandler = useCallback(() => {
    dispatch(userSlice.actions.setIsOpenUpdateProfileModal(false));
  }, []);

  const closeProfileUpdateModalAndAnimationHandler = useCallback(
    (modalRef: React.RefObject<HTMLElement>) => {
      if (modalRef.current) {
        modalRef.current.style.animation = "ProfileUpdateModalmoveDown 1s";
      }
      setTimeout(() => {
        if (isMobile) {
          history.back();
        }
        closeProfileUpdateModalHandler();
      }, 700);
    },
    []
  );

  const closeProfileUpdateModalMobileBackBtn = (
    modalRef: React.RefObject<HTMLElement>
  ) => {
    if (modalRef.current) {
      modalRef.current.style.animation = "ProfileUpdateModalmoveDown 1s";
    }
    setTimeout(() => {
      closeProfileUpdateModalHandler();
    }, 700);
  };

  return {
    closeProfileUpdateModalHandler,
    closeProfileUpdateModalAndAnimationHandler,
    closeProfileUpdateModalMobileBackBtn
  };
};
