import { useValidationInput } from "../../useValidationInput";

export const useUserInfoSettingPwInput = () => {
  const [passwordValue, passwordValid, onChangePassword, setPasswordValue, setPasswordValid] =
    useValidationInput("", "password", false);

  const checkPwMatchValidation = (
    e: React.ChangeEvent<HTMLInputElement>,
    passwordChkValue: string
  ) => {
    if (passwordChkValue && passwordChkValue !== e.target.value.trim()) {
      return setPasswordValid({
        errorMsg: "비밀번호가 일치하지 않습니다.",
        valid: false
      });
    }
  };

  return {
    passwordValue,
    passwordValid,
    onChangePassword,
    setPasswordValue,
    setPasswordValid,
    checkPwMatchValidation
  };
};
