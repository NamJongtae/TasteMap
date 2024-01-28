import { useFormContext } from "react-hook-form";
import { FindAccountBtn, LoginLink } from "../../findAccount.styles";
import { TFindAccountMenu } from "../../../../types/types";

interface IProps {
  menu: TFindAccountMenu;
  isFind: boolean;
  isLoading: boolean;
}

export default function FormButton({ menu, isFind, isLoading }: IProps) {
  const { formState } = useFormContext();

  if (isFind) {
    return <LoginLink to='/login'>로그인 하러가기</LoginLink>;
  }

  if (isLoading) {
    return (
      <FindAccountBtn type='submit' disabled={isLoading}>
        Loading...
      </FindAccountBtn>
    );
  }

  return (
    <FindAccountBtn type='submit' disabled={!formState.isValid}>
      {menu === "EMAIL" ? "이메일 찾기" : "비밀번호 찾기"}
    </FindAccountBtn>
  );
}
