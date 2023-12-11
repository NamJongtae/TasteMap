import { useDispatch } from "react-redux";
import { userSlice } from "../../../../slice/userSlice";
import { AppDispatch } from "../../../../store/store";
import { isMobile } from "react-device-detect";

export default function useCloseFollowingModal() {
  const dispatch = useDispatch<AppDispatch>();

  const closeFollowingModalHandler = (
    modalRef?: React.RefObject<HTMLDivElement>
  ) => {
    if (modalRef?.current) {
      modalRef.current.style.animation = "FollowModalmoveDown 1s";
      setTimeout(() => {
        if (isMobile) {
          history.back();
        }
        dispatch(userSlice.actions.setIsOpenFollowingModal(false));
      }, 700);
    } else {
      dispatch(userSlice.actions.setIsOpenFollowingModal(false));
    }
  };

  return { closeFollowingModalHandler };
}
