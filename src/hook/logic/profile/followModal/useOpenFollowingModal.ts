import { useDispatch } from "react-redux";
import { userSlice } from "../../../../slice/userSlice";
import { AppDispatch } from "../../../../store/store";

export default function useOpenFollowingModal() {
  const dispatch = useDispatch<AppDispatch>();

  const openFollowingModalHandler = () => {
    dispatch(userSlice.actions.setIsOpenFollowingModal(true));
  };

  return { openFollowingModalHandler };
}
