import React from "react";
import FormButton from "../formButton/FormButton";
import { useFindAccountEmailDataFetch } from "../../../../hook/logic/findAccount/findAccountForm/useFindAccountEmailDataFetch";
import { MyForm } from "../../../../component/commons/UI/myForm/MyForm";
import FindEmailField from "./FindEmailField/FindEmailField";
import { FormContentWrapper } from "../../findAccount.styles";
import FindEmailValueContent from "./FindEmailValueContent/FindEmailValueContent";
import FindAccountError from "../FindAccountError/FindAccountError";

export default function FindEmailForm() {
  const {
    findEmailHandler,
    findEmailValue,
    findEmailIsPending,
    findEmailError
  } = useFindAccountEmailDataFetch();

  return (
    <MyForm onSubmit={findEmailHandler} formOptions={{ mode: "onChange" }}>
      <FormContentWrapper>
        {findEmailValue?.email ? (
          <FindEmailValueContent findEmailValue={findEmailValue} />
        ) : (
          <FindEmailField />
        )}
        {<FindAccountError isError={findEmailError} />}
        <FormButton
          menu={"email"}
          isFind={!!findEmailValue?.email}
          isLoading={findEmailIsPending}
        />
      </FormContentWrapper>
    </MyForm>
  );
}
