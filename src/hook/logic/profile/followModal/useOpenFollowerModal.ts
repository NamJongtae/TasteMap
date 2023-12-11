import { useDispatch } from "react-redux";
import { userSlice } from "../../../../slice/userSlice";
import { AppDispatch } from "../../../../store/store";

export default function useOpenFollowerModal() {
  const dispatch = useDispatch<AppDispatch>();

  const openFollowerModalHandler = () => {
    dispatch(userSlice.actions.setIsOpenFollowerModal(true));
  };

  return { openFollowerModalHandler };
}
