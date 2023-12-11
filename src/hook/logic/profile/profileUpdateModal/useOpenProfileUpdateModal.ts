import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { userSlice } from "../../../../slice/userSlice";

export const useOpenProfileUpdateModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const openProfileUpdateModalHandler = useCallback(() => {
    dispatch(userSlice.actions.setIsOpenUpdateProfileModal(true));
  }, []);

  return { openProfileUpdateModalHandler };
};
