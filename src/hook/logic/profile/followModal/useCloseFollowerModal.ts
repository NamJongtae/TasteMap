import { useDispatch } from "react-redux";
import { userSlice } from "../../../../slice/userSlice";
import { AppDispatch } from "../../../../store/store";

export default function useCloseFollowerModal() {
  const dispatch = useDispatch<AppDispatch>();

  const closeFollowerModalHandler = () => {
    dispatch(userSlice.actions.setIsOpenFollowerModal(false));
  };

  return { closeFollowerModalHandler };
}
