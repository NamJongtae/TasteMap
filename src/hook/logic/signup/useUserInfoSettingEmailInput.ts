import { useValidationInput } from "../../useValidationInput";

export const useUserInfoSettingEmailInput = () => {
  const [emailValue, emailValid, onChangeEmail] = useValidationInput(
    "",
    "email",
    true
  );

  return { emailValue, emailValid, onChangeEmail };
};
