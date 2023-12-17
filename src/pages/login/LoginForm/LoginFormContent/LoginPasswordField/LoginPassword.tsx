import { InputField } from "../../../../../component/commons/UI/InputField/InputField";
import {
  passwordRegex,
  passwordRegexErrorMsg
} from "../../../../../library/validationRegex";

export default function LoginPassword() {
  return (
    <InputField
      label_hidden={true}
      label={"비밀번호"}
      name={"password"}
      id={"input-password"}
      placeholder={"Password"}
      type={"password"}
      pattern={{
        value: passwordRegex,
        message: passwordRegexErrorMsg
      }}
      required={true}
    />
  );
}
