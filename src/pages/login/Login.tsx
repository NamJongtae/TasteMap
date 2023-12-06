import React from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
export const Title = styled.h1``;

export const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  height: 100vh;
  overflow: auto;
`;

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
