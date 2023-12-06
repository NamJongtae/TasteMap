import { useValidationInput } from "../../useValidationInput";

export const useUserInfoSettingPhoneInput = () => {
  const [phoneValue, phoneValid, onChangePhone] = useValidationInput(
    "",
    "phone",
    true
  );

  return { phoneValue, phoneValid, onChangePhone };
};
