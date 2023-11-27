import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../../api/firebase/loginAPI";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { userSlice } from "../../../slice/userSlice";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";

export const useLoginMutation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
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
    },
    onError: (error) => {
      if (error?.message.includes("auth/invalid-email")) {
        sweetToast("유효하지 않은 이메일 형식 입니다!", "warning");
      } else if (error?.message.includes("auth/missing-email")) {
        sweetToast("존재하지 않는 이메일 입니다!", "warning");
      } else if (error?.message.includes("auth/user-not-found")) {
        sweetToast("일치 하는 로그인 정보가 없습니다!", "warning");
      } else if (error?.message.includes("auth/wrong-password")) {
        sweetToast("아이디 또는 비밀번호가 일치하지 않습니다!", "warning");
      } else if (error?.message.includes("auth/too-many-requests")) {
        sweetToast(
          "많은 로그인 시도로 로그인이 일시적으로 제한되었습니다!",
          "warning"
        );
      }
      console.error(error);
    }
  });

  return { mutate, isPending };
};
