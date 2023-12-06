import { useValidationInput } from "../../useValidationInput";

export const useUserInfoSettingPwChkInput = () => {
  const [
    passwordChkValue,
    passwordChkValid,
    onChangePasswordChk,
    setPasswordChkValue,
    setPasswordChkValid
  ] = useValidationInput("", "password", false);

  const checkPwChkMatchValidation = (
    e: React.ChangeEvent<HTMLInputElement>,
    passwordValue: string
  ) => {
    if (passwordValue && passwordValue !== e.target.value.trim()) {
      return setPasswordChkValid({
        errorMsg: "비밀번호가 일치하지 않습니다.",
        valid: false
      });
    }
  };

  return {
    passwordChkValue,
    passwordChkValid,
    onChangePasswordChk,
    setPasswordChkValue,
    setPasswordChkValid,
    checkPwChkMatchValidation,
  };
};
