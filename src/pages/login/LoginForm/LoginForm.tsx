import React from "react";
import { useLoginDataFetch } from "../../../hook/logic/login/useLoginDataFetch";
import { MyForm } from "../../../component/commons/UI/myForm/MyForm";
import LoginFormContent from "./LoginFormContent/LoginFormContent";

export default function LoginForm() {
  const { loginIsPending, loginHandler, loginError } = useLoginDataFetch();

  return (
    <MyForm
      onSubmit={loginHandler}
      formOptions={{
        mode: "onChange",
        defaultValues: { email: "", password: "" }
      }}
    >
      <LoginFormContent
        loginError={loginError}
        loginIsPending={loginIsPending}
      />
    </MyForm>
  );
}
