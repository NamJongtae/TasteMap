import { useMutation } from "@tanstack/react-query";
import { signup } from "../../../api/firebase/signupAPI";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { userSlice } from "../../../slice/userSlice";

export const useSignupMutation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      displayName,
      file,
      email,
      password,
      phone,
      introduce
    }: {
      displayName: string;
      file: File | "";
      email: string;
      password: string;
      phone: string;
      introduce: string;
    }) => signup(displayName, file, email, password, phone, introduce),
    onSuccess: (user) => {
      dispatch(userSlice.actions.setMyInfo(user));
      localStorage.setItem("user", JSON.stringify(user));
      sweetToast(`${user.displayName}님 환영합니다.`, "success", 1500);
    },
    onError: (error) => {
      if (error.message.includes("email-already-in-use")) {
        sweetToast("이미 사용중인 이메일 입니다!", "warning");
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
          "warning"
        );
      }
    }
  });

  return { mutate, isPending };
};
