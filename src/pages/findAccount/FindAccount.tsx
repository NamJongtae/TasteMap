
import FormMenu from "./formMenu/FormMenu";
import FindAccountForm from "./findAccontForm/FindAccountForm";
import { FormWrapper, Title, Wrapper } from './findAccount.styles';
import { useFindAccountFormMenuController } from '../../hook/logic/findAccount/useFindAccountFormMenuController';

export default function FindAccount() {
  const {
    activeMenu,
    activeFindEmailMenuHandler,
    activeFindPasswordMenuHandler
  } = useFindAccountFormMenuController();


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
