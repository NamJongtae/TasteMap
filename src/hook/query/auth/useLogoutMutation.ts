import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../../api/firebase/loginAPI";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { userSlice } from "../../../slice/userSlice";
import { useNavigate } from "react-router-dom";

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("user");
      dispatch(userSlice.actions.setMyInfo({}));
      queryClient.removeQueries();
      navigate("/");
    }
  });

  return { mutate, isPending };
};
