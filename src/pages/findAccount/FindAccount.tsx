import { useFindAccountControllFormMenu } from "../../hook/logic/findAccount/useFindAccountControllFormMenu";
import FormMenu from "./formMenu/FormMenu";
import FindAccountForm from "./findAccontForm/FindAccountForm";
import { FormWrapper, Title, Wrapper } from './findAccount.styles';

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
