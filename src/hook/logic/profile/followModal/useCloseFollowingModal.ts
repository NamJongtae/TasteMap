import { useDispatch } from "react-redux";
import { userSlice } from "../../../../slice/userSlice";
import { AppDispatch } from "../../../../store/store";
import { isMobile } from "react-device-detect";

export default function useCloseFollowingModal() {
  const dispatch = useDispatch<AppDispatch>();

  const closeFollowingModalHandler = () => {
    dispatch(userSlice.actions.setIsOpenFollowingModal(false));
  };

  const closeFollowingModalAnimdationHandler = (
    modalRef: React.RefObject<HTMLElement>
  ) => {
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

  const closeFollowingModalMobileBackBtn = (
    modalRef: React.RefObject<HTMLElement>
  ) => {
    if (modalRef.current) {
      modalRef.current.style.animation = "FollowModalmoveDown 1s";
      setTimeout(() => {
        closeFollowingModalHandler();
      }, 700);
    }
  };

  return {
    closeFollowingModalHandler,
    closeFollowingModalAnimdationHandler,
    closeFollowingModalMobileBackBtn
  };
}
