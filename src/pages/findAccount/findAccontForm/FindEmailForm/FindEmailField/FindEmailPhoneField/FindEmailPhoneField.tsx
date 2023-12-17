import React from "react";
import { InputField } from "../../../../../../component/commons/UI/InputField/InputField";
import { useFormContext } from "react-hook-form";
import { useFindAccountPhoneInput } from "../../../../../../hook/logic/findAccount/findAccountForm/useFindAccountPhoneInput";
import {
  phoneRegex,
  phoneRegexErrorMsg
} from "../../../../../../library/validationRegex";

export default function FindEmailPhoneField() {
  const { setValue, trigger } = useFormContext();
  const { handlePhoneChange } = useFindAccountPhoneInput({ setValue, trigger });

  return (
    <InputField
      label={"휴대폰"}
      placeholder={"휴대폰 번호 ( - 제외 )"}
      name={"phone"}
      type={"text"}
      required={true}
      pattern={{
        value: phoneRegex,
        message: phoneRegexErrorMsg
      }}
      onChange={handlePhoneChange}
      maxLength={13}
    />
  );
}
