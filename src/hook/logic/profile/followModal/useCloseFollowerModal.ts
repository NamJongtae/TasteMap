import { useDispatch } from "react-redux";
import { userSlice } from "../../../../slice/userSlice";
import { AppDispatch } from "../../../../store/store";
import { isMobile } from "react-device-detect";

export default function useCloseFollowerModal() {
  const dispatch = useDispatch<AppDispatch>();

  const closeFollowerModalHandler = () => {
    dispatch(userSlice.actions.setIsOpenFollowerModal(false));
  };

  const closeFollowerModalAnimationHandler = (
    modalRef: React.RefObject<HTMLElement>
  ) => {
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

  const closeFollowerModalMobileBackBtn = (
    modalRef: React.RefObject<HTMLElement>
  ) => {
    if (modalRef.current) {
      modalRef.current.style.animation = "FollowModalmoveDown 1s";
      setTimeout(() => {
        closeFollowerModalHandler();
      }, 700);
    }
  };

  return {
    closeFollowerModalHandler,
    closeFollowerModalAnimationHandler,
    closeFollowerModalMobileBackBtn
  };
}
