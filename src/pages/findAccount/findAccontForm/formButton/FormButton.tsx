import { FindAccountBtn, LoginLink } from './formButton.styles';

interface IProps {
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
