import React from "react";
import { InputField } from "../../../../../component/commons/UI/InputField/InputField";
import { useFindAccountPhoneInput } from "../../../../../hook/logic/findAccount/findAccountForm/useFindAccountPhoneInput";
import { useFormContext } from "react-hook-form";
import {
  phoneRegex,
  phoneRegexErrorMsg
} from "../../../../../library/validationRegex";
import { useSignupCheckDuplication } from "../../../../../hook/logic/signup/useSignupCheckDuplication";

export default function PhoneField() {
  const { setValue, trigger } = useFormContext();
  const { handlePhoneChange } = useFindAccountPhoneInput({ setValue, trigger });

  const {
    checkDuplicationHandler: checkPhoneDuplicationHandler,
    resetCheckDuplication: resetCheckPhoneDuplication
  } = useSignupCheckDuplication({
    type: "PHONE"
  });

  return (
    <InputField
      type='text'
      label={"휴대폰 (필수)"}
      name={"phone"}
      id={"phone"}
      placeholder={"휴대폰 번호를 입력해주세요. ( - 제외 )"}
      maxLength={13}
      pattern={{
        value: phoneRegex,
        message: phoneRegexErrorMsg
      }}
      required={true}
      onChange={(e) => {
        handlePhoneChange(e);
        checkPhoneDuplicationHandler(e.target.value);
        resetCheckPhoneDuplication();
      }}
    />
  );
}
