import { useValidationInput } from "../../useValidationInput";

export const useProfileSettingDisplayNameInput = () => {
  const [displayNameValue, displayNameValid, onChangeDislayName] =
    useValidationInput("", "displayName", true);

  return { displayNameValue, displayNameValid, onChangeDislayName };
};
