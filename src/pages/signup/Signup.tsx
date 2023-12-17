import React from "react";
import { Wrapper, Title } from "./signup.styles";
import { MyForm } from "../../component/commons/UI/myForm/MyForm";
import FormContent from "./FormContent/FormContent";
import { useSignupDataFetch } from "../../hook/logic/signup/useSignupDataFetch";
import Loading from "../../component/commons/loading/Loading";
import { useSingupSetScreenSize } from "../../hook/logic/signup/useSignupSetScreenSize";

export default function Signup() {
  const { signupHandler, signupLoading } = useSignupDataFetch();
  
// 모바일 화면 100vh 높이 설정시 화면 스크롤 문제 해결
  useSingupSetScreenSize();

  if (signupLoading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <Title>회원가입</Title>
      <MyForm
        onSubmit={signupHandler}
        formOptions={{
          mode: "onChange",
          defaultValues: {
            email: "",
            password: "",
            passwordChk: "",
            phone: "",
            nickname: "",
            img: process.env.REACT_APP_DEFAULT_PROFILE_IMG,
            introduce: ""
          }
        }}
      >
        <FormContent />
      </MyForm>
    </Wrapper>
  );
}
