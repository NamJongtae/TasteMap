import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { useCallback } from "react";
import { userSlice } from "../../../../slice/userSlice";

export const useCloseProfileUpdateModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const closeProfileUpdateModalHandler = useCallback(() => {
    dispatch(userSlice.actions.setIsOpenUpdateProfileModal(false));
  }, []);

  return { closeProfileUpdateModalHandler };
};
