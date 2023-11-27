import { useMutation } from "@tanstack/react-query";
import { socialLogin } from "../../../api/firebase/loginAPI";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { userSlice } from "../../../slice/userSlice";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";

export const useSocialLoginMutation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { mutate, isPending } = useMutation({
    mutationFn: (type: "google" | "github") => socialLogin(type),
    onSuccess: () => {
      // 현재 유저 정보를 불러옴
      const user = getAuth().currentUser;
      // 현재 유저 데이터를 data에 저장
      dispatch(
        userSlice.actions.setMyInfo({
          uid: user?.uid || "",
          displayName: user?.displayName || "",
          email: user?.email || "",
          photoURL: user?.photoURL || ""
        })
      );
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
    },
    onError: (error) => {
      if (
        error.message.includes("auth/account-exists-with-different-credential")
      ) {
        sweetToast("이미 가입된 이메일 계정입니다!", "warning");
      } else {
        sweetToast(
          "알 수 없는 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.",
          "warning"
        );
      }
    }
  });

  return { mutate, isPending };
};
