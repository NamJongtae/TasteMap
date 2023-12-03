import { useFindAccount } from "../../hook/logic/findAccount/useFindAccount";
import UserInput from "../../component/commons/userInput/UserInput";
import ErrorMsg from "../../component/commons/errorMsg/ErrorMsg";
import Loading from "../../component/commons/loading/Loading";
import {
  FindAccountBtn,
  FindAccountForm,
  FindInfoDate,
  FindInfoText,
  FindInfoWrapper,
  FormMenu,
  FormMenuBtn,
  FormMenuLi,
  FormWrapper,
  LoginLink,
  Title,
  Wrapper
} from "./findAccount.style";

export default function FindAccount() {
  const {
    findPasswordMenu,
    findEmailActiveHandler,
    findPwActiveHandler,
    findPasswordHandler,
    findEmailHandler,
    findEmailValue,
    emailValue,
    onChangeEmail,
    emailValid,
    displayNameValue,
    onChangeDisplayName,
    displayNameValid,
    phoneValue,
    onChangePhone,
    phoneValid,
    isFindPassword,
    disabled,
    isLoading
  } = useFindAccount();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Title className='a11y-hidden'>이메일 비밀번호 찾기</Title>
      <FormWrapper>
        <FormMenu>
          <FormMenuLi active={!findPasswordMenu}>
            <FormMenuBtn
              active={!findPasswordMenu}
              type='button'
              onClick={findEmailActiveHandler}
            >
              이메일 찾기
            </FormMenuBtn>
          </FormMenuLi>
          <FormMenuLi active={findPasswordMenu}>
            <FormMenuBtn
              active={findPasswordMenu}
              type='button'
              onClick={findPwActiveHandler}
            >
              비밀번호 찾기
            </FormMenuBtn>
          </FormMenuLi>
        </FormMenu>
        <FindAccountForm
          onSubmit={findPasswordMenu ? findPasswordHandler : findEmailHandler}
        >
          {findEmailValue?.email || isFindPassword ? (
            <FindInfoWrapper>
              {findEmailValue?.email ? (
                <>
                  <FindInfoText>
                    휴대폰 번호와 일치하는 이메일 정보입니다.
                  </FindInfoText>
                  <FindInfoText>
                    {`이메일 : ${findEmailValue.email}`}
                  </FindInfoText>
                  <FindInfoText>
                    가입일 :{" "}
                    <FindInfoDate dateTime={findEmailValue.createdAt}>
                      {findEmailValue.createdAt}
                    </FindInfoDate>
                  </FindInfoText>
                </>
              ) : (
                <FindInfoText>
                  {
                    "가입된 메일로 비밀번호 변경 메일을 발송하였습니다.\n메일이 없을 경우 스팸 메일함을 확인해주세요."
                  }
                </FindInfoText>
              )}
            </FindInfoWrapper>
          ) : (
            <>
              {findPasswordMenu ? (
                <>
                  <UserInput
                    type='text'
                    label={"이메일"}
                    id={"input-email"}
                    placeholder={"이메일을 입력해주세요."}
                    value={emailValue}
                    onChange={onChangeEmail}
                  />
                  {emailValid.errorMsg && (
                    <ErrorMsg message={emailValid.errorMsg} />
                  )}
                </>
              ) : (
                <>
                  <UserInput
                    label={"닉네임"}
                    placeholder={"4-10자 영문, 영문+숫자 포함"}
                    type={"text"}
                    value={displayNameValue}
                    onChange={onChangeDisplayName}
                    minLength={4}
                    maxLength={10}
                  />
                  {displayNameValid.errorMsg && (
                    <ErrorMsg message={displayNameValid.errorMsg} />
                  )}
                </>
              )}
              <UserInput
                label={"휴대폰"}
                placeholder={"휴대폰 번호 ( - 제외 )"}
                type={"text"}
                value={phoneValue
                  .replace(/[^0-9]/g, "")
                  .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
                onChange={onChangePhone}
                maxLength={13}
              />
              {phoneValid.errorMsg && (
                <ErrorMsg message={phoneValid.errorMsg} />
              )}
            </>
          )}
          {findEmailValue?.email || isFindPassword ? (
            <LoginLink to='/login'>로그인 하러가기</LoginLink>
          ) : (
            <FindAccountBtn type='submit' disabled={disabled}>
              {findPasswordMenu ? "비밀번호 찾기" : "이메일 찾기"}
            </FindAccountBtn>
          )}
        </FindAccountForm>
      </FormWrapper>
    </Wrapper>
  );
}
