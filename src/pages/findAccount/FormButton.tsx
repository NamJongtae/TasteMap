import { Link } from "react-router-dom";
import styled from "styled-components";

export const FindAccountBtn = styled.button`
  width: 100%;
  background-color: ${(props) => (props.disabled ? "#cbcbcb" : "#a16ee9")};
  cursor: ${(props) => (props.disabled ? "default" : "cursor")};
  padding: 14px 0;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 500;
  margin-top: 10px;
  transition: all 0.5s;
  color: #fff;
`;

export const LoginLink = styled(Link)`
  display: block;
  text-align: center;
  width: 100%;
  padding: 18px 0;
  border-radius: 4px;
  background-color: #a16ee9;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  margin-top: 10px;
`;

export interface IProps {
  activeMenu: "email" | "password";
  isFindEmailValue: boolean;
  isFindPassword: boolean;
  submitBtnDisabled: boolean;
  isLoading: boolean;
}
export default function FormButton({
  activeMenu,
  isFindEmailValue,
  isFindPassword,
  submitBtnDisabled,
  isLoading
}: IProps) {

  if (isLoading) {
    return (
      <FindAccountBtn type='button' disabled={isLoading}>
        Loading...
      </FindAccountBtn>
    );
  }
  return (
    <>
      {isFindEmailValue || isFindPassword ? (
        <LoginLink to='/login'>로그인 하러가기</LoginLink>
      ) : (
        <FindAccountBtn type='submit' disabled={submitBtnDisabled}>
          {activeMenu === "email" ? "이메일 찾기" : "비밀번호 찾기"}
        </FindAccountBtn>
      )}
    </>
  );
}
