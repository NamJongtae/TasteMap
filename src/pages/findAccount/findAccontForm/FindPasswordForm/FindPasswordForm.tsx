import React from "react";
import FormButton from "../formButton/FormButton";
import { useFindAccountPwDataFetch } from "../../../../hook/logic/findAccount/findAccountForm/useFindAccountPwDataFetch";
import { MyForm } from "../../../../component/commons/UI/myForm/MyForm";
import { FormContentWrapper } from "../../findAccount.styles";
import FindPasswordValueContent from "./FindPasswordValueContent/FindPasswordValueContent";
import FindPasswordField from "./FindPasswordField/FindPasswordField";
import FindAccountError from "../FindAccountError/FindAccountError";

export default function FindPasswordForm() {
  const {
    findPasswordHandler,
    findPasswordIsPending,
    isFindPassword,
    findPasswordError
  } = useFindAccountPwDataFetch();

  return (
    <MyForm onSubmit={findPasswordHandler} formOptions={{ mode: "onChange" }}>
      <FormContentWrapper>
        {isFindPassword ? <FindPasswordValueContent /> : <FindPasswordField />}
        {<FindAccountError isError={findPasswordError} />}
        <FormButton
          menu={"PASSWORD"}
          isFind={!!isFindPassword}
          isLoading={findPasswordIsPending}
        />
      </FormContentWrapper>
    </MyForm>
  );
}
