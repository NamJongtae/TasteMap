import { useEffect } from "react";
import { useValidationInput } from "../../../useValidationInput";

interface IParms {
  activeMenu: "email" | "password";
}

export const useFindAccountDisplayNameInput = ({ activeMenu }: IParms) => {
  const [
    displayNameValue,
    displayNameValid,
    onChangeDisplayName,
    setDisplayNameValue,
    setDisplayNameValid
  ] = useValidationInput("", "displayName", false);

  const resetValue = () => {
    setDisplayNameValue("");
    setDisplayNameValid({ errorMsg: "", valid: false });
  };

  useEffect(() => {
    resetValue();
  }, [activeMenu]);

  return { displayNameValue, displayNameValid, onChangeDisplayName };
};
