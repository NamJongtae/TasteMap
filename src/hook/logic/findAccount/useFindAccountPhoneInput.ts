import { useEffect } from "react";
import { useValidationInput } from "../../useValidationInput";

interface IParms {
  activeMenu: "email" | "password";
}

export const useFindAccountPhoneInput = ({ activeMenu }: IParms) => {
  const [phoneValue, phoneValid, onChangePhone, setPhoneValue, setPhoneValid] =
    useValidationInput("", "phone", false);

  const resetValue = () => {
    setPhoneValue("");
    setPhoneValid({ errorMsg: "", valid: false });
  };

  useEffect(() => {
    resetValue();
  }, [activeMenu]);

  return { phoneValue, phoneValid, onChangePhone };
};
