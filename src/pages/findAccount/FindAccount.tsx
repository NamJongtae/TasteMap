import { useFindAccountControllFormMenu } from "../../hook/logic/findAccount/useFindAccountControllFormMenu";
import FormMenu from "./FormMenu";
import FindAccountForm from "./FindAccountForm";
import styled from "styled-components";

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow: auto;
  background-color: #f5f5f5;
`;

export const FormWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`;

export const Title = styled.h1``;

export default function FindAccount() {
  const {
    activeMenu,
    activeFindEmailMenuHandler,
    activeFindPasswordMenuHandler
  } = useFindAccountControllFormMenu();


  return (
    <Wrapper>
      <Title className='a11y-hidden'>이메일 비밀번호 찾기</Title>
      <FormWrapper>
        <FormMenu
          activeMenu={activeMenu}
          activeFindEmailMenuHandler={activeFindEmailMenuHandler}
          activeFindPasswordMenuHandler={activeFindPasswordMenuHandler}
        />
        <FindAccountForm activeMenu={activeMenu} />
      </FormWrapper>
    </Wrapper>
  );
}
