import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../../api/firebase/loginAPI";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { userSlice } from "../../../slice/userSlice";

export const useLoginMutation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: () => {
      const user = getAuth().currentUser;
      dispatch(userSlice.actions.setMyInfo(user));
      // localstorage에 유저 데이터를 저장
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL
        })
      );
      queryClient.setQueryData(["auth"], {
        uid: user?.uid,
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL
      });
    }
  });

  return { mutate, isPending, error };
};
