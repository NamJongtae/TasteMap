import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import { Title, Wrapper } from './login.styles';

export default function Login() {
  return (
    <>
      <Title className='a11y-hidden'>로그인 페이지</Title>
      <Wrapper>
        <LoginForm />
      </Wrapper>
    </>
  );
}
