import { useValidationInput } from "../../useValidationInput";

export const useLoginPasswordInput = () => {
  const [passwordValue, passwordValid, onChangePassword, setPasswordValue] =
    useValidationInput("", "password", false);

  const resetPasswordValue = () => {
    setPasswordValue("");
  };

  return {
    passwordValue,
    passwordValid,
    onChangePassword,
    setPasswordValue,
    resetPasswordValue
  };
};
