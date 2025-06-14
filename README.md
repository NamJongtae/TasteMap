# 🍽 TasteMap
![thumbnail](https://github.com/NamJongtae/TasteMap/assets/113427991/16745d53-453b-4e9b-b0f5-84a60f9b1d4a)
#### 🎈 테스트 계정
| ID         | PW     |
|------------|--------|
| test@a.com | asdzxc123! |

#### 🌏 배포 URL : 🍴 [TasteMap](https://tastemaps.netlify.app)

<br/>

### 📃 목차 (클릭 시 해당 목차로 이동합니다.)
- [🙋‍♂ 프로젝트 소개](#-프로젝트-소개)
  
- [📆 개발기간](#-개발기간)

- [✨ Refactoring](#-refactoring)
  
- [⚙ 개발환경](#-개발환경)
  
- [🔩 벡엔드&API](#-벡엔드--api)

- [⛓ 아키텍처](#-아키텍처) 

- [🚩 User Flow](#-user-flow--이미지를-클릭-해주세요-) 
  
- [🛠 프로젝트 관리](#-프로젝트-관리)
  
- [📃 GitHub 컨벤션](#-github-컨벤션)
  
- [👀 구현 기능 미리보기](#-구현-기능-미리보기--제목-클릭-시-해당-기능-상세설명으로-이동됩니다-)
  
<br>

### 🙋‍♂ 프로젝트 소개
> **TasteMap은 맛집을 공유하고 자신의 맛집 지도를 완성하는 SNS 플랫폼입니다.**
- 나만 알고 있는 숨겨진 맛집 정보를 공유하고, 원하는 맛집을 나의 맛집 지도에 추가하여 나만의 맛집 지도를 완성할 수 있습니다.
- 내가 만든 맛집 지도를 별도의 URL 링크를 통해 공유할 수 있습니다.
- 지도의 로드 뷰 기능을 통해 해당 맛집 위치를 쉽게 파악할 수 있습니다.
- 댓글과 답글 작성을 통해 여러 사용자들과 맛집에 대해 소통할 수 있습니다.
- 팔로우한 사용자의 게시물을 피드 페이지에서 볼 수 있습니다.

>**개발 의도**
- 나만 알고 있는 숨은 맛집을 공유하고, 사용자들이 맛집 정보를 알아가며 나만의 맛집 지도를 완성해가는 SNS 플랫폼을 구현하고자 개발하게 되었습니다.
- 가게 홍보 및 지역 특색 먹거리들을 알려 지역 경제 활성화에 도움을 주고자 개발하게 되었습니다.

<br>

### 📆 개발기간
**개발 시작 : 2023. 09. 08**

**개발 완료 : 2023. 10. 08**

**Refactoring**
- react-query 도입 : 2023.11.19 ~ 2023.11.27
- customhook 디자인 패턴 적용: 2023.12.01 ~ 2023.12.03
- clean code : 2023.12.04 ~ 2023.12.19 
- react-hook-form : 2023.12.12 ~ 2023.12.18

<br/>

### ✨ Refactoring
#### 🧪 react-query 도입

> 도입 이유
- 기존에는 redux-toolkit thunk를 이용하여 api 처리 및 api 상태관리가 코드 양이 많아지고, 복잡하다는 단점이 있어 react-query를 도입하였습니다.

> 도입 방식
- 기존 redux-toolkit은 global state 관리를 위해 사용하고, react-query는 api 처리 및 api 상태관리에 사용하였습니다.

> 도입으로 얻은 이점 
- react-query 도입으로 서버 api 처리가 매우 간결해 졌으면 상태관리 코드를 직접 구성하지 않아도 react-query 자체 내장된 상태관리 속성을 통해 상태관리를 할 수 있었습니다.
- react-query는 캐싱된 데이터를 사용하기 때문에 속도 향상에 도움을 줄 수 있었습니다.
- 동일한 데이터 요청의 경우 자동으로 제거하기 때문에 중복 요청을 신경쓰지 않아도 되어 편리하게 사용할 수 있었습니다.

<br>

#### 🧩 customhook 디자인 패턴 적용
> 적용 이유
- UI와 logic를 구분할 수 있으면 UI와 기능에만 초점을 둘 수 있어 개발 및 유지 보수가 용이하기 때문입니다.
- customhook 패턴을 사용하면 반복되는 logic의 재사용성을 높일 수 있기때문입니다.

> 적용 방식
  - customhook으로 컴포넌트에 필요한 로직들을 구현하고 기존 컴포넌트에는 UI 코드만 남기도록 리팩토링 하였으며, 필요한 로직은 커스텀 훅으로 불러와 사용하였습니다.

> 적용으로 얻은 이점
-  기존 container, presenter 패턴은 props로 presenter에 필요한 값들을 넘겨주어야 했습니다. props가 많아 질수록 코드가 복잡해지며, 유지보수가 안좋아진다는 단점이 존재하였습니다. customhook 패턴을 통해 이를 해결하여 코드가 더 간결해질 수 있었습니다. 
- customhook으로 구현하였기 때문에 재사용성이 높아졌습니다.
- UI와 기능을 구분하였기 땨문에 각각의 기능에 집중할 수 있으며 유지보수성 또한 향상되었습니다.

> 코드 비교
<details>
<summary>코드 보기</summary>

<!--summary 아래 빈칸 공백 두고 내용을 적는공간-->

<br>

**이전 코드**
```javascript
import React, { useEffect, useRef, useState } from "react";
import {
  LoginBtn,
  LoginForm,
import {
  InputWrapper,
  SocialLoginItem
} from "./login.styels";

import { useValidationInput } from "../../hook/useValidationInput";
import Loading from "../../component/commons/loading/Loading";
import ErrorMsg from "../../component/commons/errorMsg/ErrorMsg";
import UserInput from "../../component/commons/userInput/UserInput";
import { useLoginMutation } from "../../hook/query/auth/useLoginMutation";
import { useSocialLoginMutation } from "../../hook/query/auth/useSocialLoginMutation";
import { useSupportedWebp } from '../../hook/useSupportedWebp';

export default function Login() {
  const { isWebpSupported, resolveWebp } = useSupportedWebp();
  const [disabled, setDisabled] = useState(true);
  const emailRef = useRef<HTMLInputElement>(null);
  const [emailValue, emailValid, onChangeEmail, setEmailValue] =
    useValidationInput("", "email", false);
  const [passwordValue, passwordValid, onChangePassword, setPasswordValue] =
    useValidationInput("", "password", false);

  const { mutate: loginMutate, isPending: loginIsPending } = useLoginMutation();
  const { mutate: socialLoginMutate, isPending: socialLoginIsPending } =
    useSocialLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailValid.valid && passwordValid.valid) {
      loginMutate({ email: emailValue, password: passwordValue });
      setEmailValue("");
      setPasswordValue("");
      setDisabled(true);
    }
  };

  const socialLoginHandler = (type: "google" | "github") => {
    socialLoginMutate(type);
  };

  useEffect(() => {
    emailRef.current && emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (emailValid.valid && passwordValid.valid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [emailValid, passwordValid]);

  return (
    <>
      <Title className='a11y-hidden'>로그인 페이지</Title>
      <Wrapper>
        <LoginForm onSubmit={handleSubmit}>
          <LoginFormTitle>
            <img src={resolveWebp("/assets/webp/icon-loginLogo.webp", "svg")} />
          </LoginFormTitle>
              <InputWrapper>
            <UserInput
              label_hidden={true}
              label={"이메일"}
              id={"input-email"}
              placeholder={"Email"}
              type={"text"}
              value={emailValue}
              onChange={onChangeEmail}
              InputRef={emailRef}
            />
            {emailValid.errorMsg && <ErrorMsg message={emailValid.errorMsg} />}
          </InputWrapper>
          <InputWrapper>
            <UserInput
              label_hidden={true}
              label={"비밀번호"}
              id={"input-password"}
              placeholder={"Password"}
              type={"password"}
              onChange={onChangePassword}
              value={passwordValue}
            />
            {passwordValid.errorMsg && (
              <ErrorMsg message={passwordValid.errorMsg} />
            )}
          </InputWrapper>

          <FindAccountLink to={"/findAccount"}>
            이메일{" "}
            <span style={{ fontSize: "10px", verticalAlign: "top" }}>|</span>{" "}
            비밀번호 찾기
          </FindAccountLink>
          <LoginBtn type='submit' disabled={disabled}>
            로그인
          </LoginBtn>

          <SignupText>
            아직 회원이 아닌가요?
            <SignupLink to={"/signup"}>회원가입</SignupLink>
          </SignupText>
          <SocialLoginWrapper>
            <SocialLoginItem>
              <SocialLoginBtn
                className='google'
                type='button'
                onClick={() => socialLoginHandler("google")}
                $isWebpSupported={isWebpSupported}
              >
                구글 계정으로 로그인
              </SocialLoginBtn>
            </SocialLoginItem>
            <SocialLoginItem>
              <SocialLoginBtn
                className='github'
                type='button'
                onClick={() => socialLoginHandler("github")}
                $isWebpSupported={isWebpSupported}
              >
                깃 허브 계정으로 로그인
              </SocialLoginBtn>
            </SocialLoginItem>
          </SocialLoginWrapper>
        </LoginForm>
      <Wrapper />
     {(loginIsPending || socialLoginIsPending) && <Loading />}
    </>
```

**customhook 패턴 적용 후 코드**
```javascript
import React from "react";
import Loading from "../../component/commons/loading/Loading";
import ErrorMsg from "../../component/commons/errorMsg/ErrorMsg";
import UserInput from "../../component/commons/userInput/UserInput";
import { useSupportedWebp } from "../../hook/useSupportedWebp";
import {
  LoginBtn,
  LoginForm,
  LoginFormTitle,
  Title,
  Wrapper,
  SignupLink,
  FindAccountLink,
  SignupText,
  SocialLoginWrapper,
  SocialLoginBtn,
  InputWrapper,
  SocialLoginItem
} from "./login.styels";
import { useLogin } from "../../hook/logic/login/useLogin";

export default function Login() {
  const { isWebpSupported, resolveWebp } = useSupportedWebp();
  const {
    loginHandler,
    socialLoginHandler,
    disabled,
    onChangeEmail,
    onChangePassword,
    loginIsPending,
    socialLoginIsPending,
    emailValue,
    emailRef,
    emailValid,
    passwordValue,
    passwordValid
  } = useLogin();

  return (
    <>
      <Title className='a11y-hidden'>로그인 페이지</Title>
      <Wrapper>
        <LoginForm onSubmit={loginHandler}>
          <LoginFormTitle>
            <img src={resolveWebp("/assets/webp/icon-loginLogo.webp", "svg")} />
          </LoginFormTitle>
          <InputWrapper>
            <UserInput
              label_hidden={true}
              label={"이메일"}
              id={"input-email"}
              placeholder={"Email"}
              type={"text"}
              value={emailValue}
              onChange={onChangeEmail}
              InputRef={emailRef}
            />
            {emailValid.errorMsg && <ErrorMsg message={emailValid.errorMsg} />}
          </InputWrapper>
          <InputWrapper>
            <UserInput
              label_hidden={true}
              label={"비밀번호"}
              id={"input-password"}
              placeholder={"Password"}
              type={"password"}
              onChange={onChangePassword}
              value={passwordValue}
            />
            {passwordValid.errorMsg && (
              <ErrorMsg message={passwordValid.errorMsg} />
            )}
          </InputWrapper>

          <FindAccountLink to={"/findAccount"}>
            이메일{" "}
            <span style={{ fontSize: "10px", verticalAlign: "top" }}>|</span>{" "}
            비밀번호 찾기
          </FindAccountLink>
          <LoginBtn type='submit' disabled={disabled}>
            로그인
          </LoginBtn>

          <SignupText>
            아직 회원이 아닌가요?
            <SignupLink to={"/signup"}>회원가입</SignupLink>
          </SignupText>
          <SocialLoginWrapper>
            <SocialLoginItem>
              <SocialLoginBtn
                className='google'
                type='button'
                onClick={() => socialLoginHandler("google")}
                $isWebpSupported={isWebpSupported}
              >
                구글 계정으로 로그인
              </SocialLoginBtn>
            </SocialLoginItem>
            <SocialLoginItem>
              <SocialLoginBtn
                className='github'
                type='button'
                onClick={() => socialLoginHandler("github")}
                $isWebpSupported={isWebpSupported}
              >
                깃 허브 계정으로 로그인
              </SocialLoginBtn>
            </SocialLoginItem>
          </SocialLoginWrapper>
        </LoginForm>
      </Wrapper>
      {(loginIsPending || socialLoginIsPending) && <Loading />}
    </>
  );
}
```

</details>

<br>

#### 🗃️ clean code 

**클린코드**란, 무조건 짧은 코드가 아닌 읽기 좋은 코드, 흐름 파악이 쉽고, 유지 보수가 용이한 코드를 의미합니다.

아래 조건을 만족하는 clean code로 리팩토링하였습니다.

- 응집도 : 같은 목적의 코드는 뭉쳐둡니다.
- 단일책임 : 하나의 일을 하는 뚜렷한 이름의 함수를 만듭니다. 하나의 컴포넌트에서 하나의 책임을 가지도록 합니다.
- 추상화 : 핵심 개념을 필요한 만큼만 노출시킵니다.

> 적용 이유
- 기존 코드는 너무 길고 복잡하며, 유지보수시 코드의 파악이 어려웠습니다.
- 코드를 보는 사람이 이해하기 쉽도록, 유지보수 및 가독성 향상을 위해 적용하였습니다.

> 적용 방식
- 응집도, 단일책임, 추상화 3가지 원칙을 만족시키는 clean code로 코드를 변경하였습니다.

> 코드 비교
<details>
<summary>코드 보기</summary>

<!--summary 아래 빈칸 공백 두고 내용을 적는공간-->

<br/>

**이전 코드**
```javascript
import React from "react";
import Loading from "../../component/commons/loading/Loading";
import ErrorMsg from "../../component/commons/errorMsg/ErrorMsg";
import UserInput from "../../component/commons/userInput/UserInput";
import {
  LoginBtn,
  LoginForm,
  LoginFormTitle,
  Title,
  Wrapper,
  SignupLink,
  FindAccountLink,
  SignupText,
  SocialLoginWrapper,
  SocialLoginBtn,
  InputWrapper,
  SocialLoginItem
} from "./login.styels";
import { useLogin } from "../../hook/logic/login/useLogin";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { resolveWebp } from '../../library/resolveWebp';

export default function Login() {
  const isWebpSupported = useSelector((state: RootState) => state.setting.isWebpSupported);
  const {
    loginHandler,
    socialLoginHandler,
    disabled,
    onChangeEmail,
    onChangePassword,
    loginIsPending,
    socialLoginIsPending,
    emailValue,
    emailRef,
    emailValid,
    passwordValue,
    passwordValid
  } = useLogin();

  return (
    <>
      <Title className='a11y-hidden'>로그인 페이지</Title>
      <Wrapper>
        <LoginForm onSubmit={loginHandler}>
          <LoginFormTitle>
            <img src={resolveWebp("/assets/webp/icon-loginLogo.webp", "svg")} />
          </LoginFormTitle>
          <InputWrapper>
            <UserInput
              label_hidden={true}
              label={"이메일"}
              id={"input-email"}
              placeholder={"Email"}
              type={"text"}
              value={emailValue}
              onChange={onChangeEmail}
              InputRef={emailRef}
            />
            {emailValid.errorMsg && <ErrorMsg message={emailValid.errorMsg} />}
          </InputWrapper>
          <InputWrapper>
            <UserInput
              label_hidden={true}
              label={"비밀번호"}
              id={"input-password"}
              placeholder={"Password"}
              type={"password"}
              onChange={onChangePassword}
              value={passwordValue}
            />
            {passwordValid.errorMsg && (
              <ErrorMsg message={passwordValid.errorMsg} />
            )}
          </InputWrapper>

          <FindAccountLink to={"/findAccount"}>
            이메일{" "}
            <span style={{ fontSize: "10px", verticalAlign: "top" }}>|</span>{" "}
            비밀번호 찾기
          </FindAccountLink>
          <LoginBtn type='submit' disabled={disabled}>
            로그인
          </LoginBtn>

          <SignupText>
            아직 회원이 아닌가요?
            <SignupLink to={"/signup"}>회원가입</SignupLink>
          </SignupText>
          <SocialLoginWrapper>
            <SocialLoginItem>
              <SocialLoginBtn
                className='google'
                type='button'
                onClick={() => socialLoginHandler("google")}
                $isWebpSupported={isWebpSupported}
              >
                구글 계정으로 로그인
              </SocialLoginBtn>
            </SocialLoginItem>
            <SocialLoginItem>
              <SocialLoginBtn
                className='github'
                type='button'
                onClick={() => socialLoginHandler("github")}
                $isWebpSupported={isWebpSupported}
              >
                깃 허브 계정으로 로그인
              </SocialLoginBtn>
            </SocialLoginItem>
          </SocialLoginWrapper>
        </LoginForm>
      </Wrapper>
      {(loginIsPending || socialLoginIsPending) && <Loading />}
    </>
  );
}
```

**claean code 변경 후**

컴포넌트를 기능별로 분리 => LoginForm 생성

기존 useLogin customhook를 기능별로 분리

```javascript
import React from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
export const Title = styled.h1``;

const Wrapper = styled.main`
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
```

LoginForm 컴포넌트 기능별 세분화 => LoginFormTitle, InputField, FindAccountLink, LoginBtn, SignupLink, SocialLoginBtns
```javascript
// LoginForm.tsx
import React from "react";
import { InputField } from "../../component/commons/UI/InputField";
import LoginFormTitle from "./LoginFormTitle";
import FindAccountLink from "./FindAccountLink";
import SignupLink from "./SignupLink";
import { SocialLoginBtns } from "./SocialLoginBtns";
import styled from "styled-components";
import { useLoginDataFetch } from "../../hook/logic/login/useLoginDataFetch";
import { useSocialLoginDataFetch } from "../../hook/logic/login/useSocialLoginDataFetch";
import { useLoginEmailInput } from "../../hook/logic/login/useLoginEmailInput";
import Loading from "../../component/commons/loading/Loading";
import { useLoginPasswordInput } from "../../hook/logic/login/useLoginPasswordInput";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 20px;
  max-width: 400px;
  width: calc(100% - 60px);
  padding: 100px 40px 0 40px;
  @media screen and (max-width: 431px) {
    width: calc(100% - 40px);
    padding: 30px 20px;
  }
`;
const InputWrapper = styled.div`
  & > p {
    margin-top: 10px;
  }
`;
export const LoginBtn = styled.button`
  width: 100%;
  background-color: ${(props) => (props.disabled ? "#cbcbcb" : "gold")};
  padding: 14px 0;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 500;
  margin-top: 10px;
  transition: all 0.5s;
`;

export default function LoginForm() {
  const { emailValue, emailValid, onChangeEmail, emailRef } =
    useLoginEmailInput();

  const { passwordValue, passwordValid, onChangePassword } =
    useLoginPasswordInput();

  const { loginIsPending, loginHandler } = useLoginDataFetch();

  const { socialLoginHandler, socialLoginIsPending } =
    useSocialLoginDataFetch();

  if (loginIsPending || socialLoginIsPending) {
    return <Loading />;
  }

  return (
    <Form onSubmit={loginHandler}>
      <LoginFormTitle />
      <InputField
        label_hidden={true}
        label={"이메일"}
        name={"email"}
        id={"input-email"}
        placeholder={"Email"}
        type={"email"}
        onChange={onChangeEmail}
        value={emailValue}
        InputRef={emailRef}
        errorMsg={emailValid.errorMsg}
      />
      <InputField
        label_hidden={true}
        label={"비밀번호"}
        name={"password"}
        id={"input-password"}
        placeholder={"Password"}
        type={"password"}
        onChange={onChangePassword}
        value={passwordValue}
        errorMsg={passwordValid.errorMsg}
      />

      <FindAccountLink />
      <LoginBtn
        type='submit'
        disabled={!(emailValid.valid && passwordValid.valid)}
      >
        로그인
      </LoginBtn>
      <SignupLink />

      <SocialLoginBtns
        buttonTypeArr={["google", "github"]}
        textArr={["구글 계정으로 로그인", "깃 허브 계정으로 로그인"]}
        onClickArr={[
          () => socialLoginHandler("google"),
          () => socialLoginHandler("github")
        ]}
      />
    </Form>
  );
}
```

```javascript
// LoginFormTitle
import React from "react";
import styled from "styled-components";
import { resolveWebp } from "../../library/resolveWebp";

export const Title = styled.h2`
  text-align: center;
  font-weight: 500;
`;

export default function LoginFormTitle() {
  return (
    <Title>
      <img src={resolveWebp("/assets/webp/icon-loginLogo.webp", "svg")} />
    </Title>
  );
}
```

```javascript
// SignupLink.tsx
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SignupLinkWrapper = styled.div`
  display: inline-block;
  font-size: 12px;
  color: #111;
  text-align: center;
`;

const StyledSignupLink = styled(Link)`
  font-size: 12px;
  margin-left: 5px;
  font-weight: 500;
`;

export default function SignupLink() {
  return (
    <SignupLinkWrapper>
      아직 회원이 아닌가요?
      <StyledSignupLink to={"/signup"}>회원가입</StyledSignupLink>
    </SignupLinkWrapper>
  );
}
```

```javascript
// SocialLoginBtns.tsx
import styled from "styled-components";
import { useSupportedWebp } from "../../hook/useSupportedWebp";
import { isMobile } from "react-device-detect";

const SocialLoginWrapper = styled.ul`
  position: relative;
	@@ -114,3 +54,35 @@ export const SocialLoginBtn = styled.button`
    background-color: ${isMobile ? "" : "#ddd"};
  }
`;

interface IPrpos {
  buttonTypeArr: string[];
  textArr: string[];
  onClickArr: React.MouseEventHandler<HTMLButtonElement>[];
}

export const SocialLoginBtns = ({
  buttonTypeArr,
  textArr,
  onClickArr
}: IPrpos) => {
  const { isWebpSupported } = useSupportedWebp();
  return (
    <SocialLoginWrapper>
      {textArr.map((text: string, i: number) => {
        return (
          <SocialLoginItem key={text + i}>
            <SocialLoginBtn
              className={buttonTypeArr[i]}
              type='button'
              onClick={onClickArr[i]}
              $isWebpSupported={isWebpSupported}
            >
              {text}
            </SocialLoginBtn>
          </SocialLoginItem>
        );
      })}
    </SocialLoginWrapper>
  );
};
```

</details>

<br>

#### 🗒️ react-hook-form 적용
> 적용 이유
- 기존 form에 대한 로직과 관련 코드들이 복잡하기 때문에 react-hook-form를 사용하여 가독성 및 유지보수성 향상을 위해 도입하였습니다.
- formProvider를 통해 form 하위 input들의 값들을 사용할 수 있어 제어 컴포넌트의 의존성을 분리시킬 수 있기 때문에 도입하였습니다.

> 사용 방식
- formProvider를 적용시킨 MyForm customhook를 만들어서 사용하였습니다.
- 기존 InputField 컴포넌트에 react-hook-form 속성을 적용시켰습니다.
  
<details>
<summary>MyForm 코드</summary>

<!--summary 아래 빈칸 공백 두고 내용을 적는공간-->
```javascript
import React from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  UseFormProps,
  FieldValues
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Form } from "./myForm.styles";

// 제네릭 타입을 사용한 폼 interface 정의
interface GenericFormInterface<TFormData extends FieldValues> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<TFormData>;
  formOptions?: UseFormProps<TFormData>;
}

export const MyForm = <TFormData extends FieldValues>({
  children,
  onSubmit,
  formOptions
}: GenericFormInterface<TFormData>) => {
  const methods = useForm<TFormData>(formOptions);
  return (
    // form provider를 통해 useForm에서 가져온 methods를 children (하위 컴포넌트)에 전달
    <>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          {children}
        </Form>
        <DevTool control={methods.control} />
      </FormProvider>
    </>
  );
};
```

</details>


> 코드 비교
<details>
<summary>코드 보기</summary>

<!--summary 아래 빈칸 공백 두고 내용을 적는공간-->

<br>

**이전 코드**
```javascript
import React from "react";
import { InputField } from "../../../component/commons/UI/InputField";
import LoginFormTitle from "./LoginFormTitle/LoginFormTitle";
import FindAccountLink from "./FindAccountLink/FindAccountLink";
import SignupLink from "./SignupLink/SignupLink";
import { SocialLoginBtns } from "./socialLoginBtns/SocialLoginBtns";
import { useLoginDataFetch } from "../../../hook/logic/login/useLoginDataFetch";
import { useSocialLoginDataFetch } from "../../../hook/logic/login/useSocialLoginDataFetch";
import { useLoginEmailInput } from "../../../hook/logic/login/useLoginEmailInput";
import Loading from "../../../component/commons/loading/Loading";
import { useLoginPasswordInput } from "../../../hook/logic/login/useLoginPasswordInput";
import { Form, LoginBtn } from '../login.styles';

export default function LoginForm() {
  const { emailValue, emailValid, onChangeEmail, emailRef } =
    useLoginEmailInput();

  const { passwordValue, passwordValid, onChangePassword } =
    useLoginPasswordInput();

  const { loginIsPending, loginHandler } = useLoginDataFetch();

  const { socialLoginHandler, socialLoginIsPending } =
    useSocialLoginDataFetch();

  if (loginIsPending || socialLoginIsPending) {
    return <Loading />;
  }

  return (
    <Form onSubmit={loginHandler}>
      <LoginFormTitle />
      <InputField
        label_hidden={true}
        label={"이메일"}
        name={"email"}
        id={"input-email"}
        placeholder={"Email"}
        type={"email"}
        onChange={onChangeEmail}
        value={emailValue}
        InputRef={emailRef}
        errorMsg={emailValid.errorMsg}
      />
      <InputField
        label_hidden={true}
        label={"비밀번호"}
        name={"password"}
        id={"input-password"}
        placeholder={"Password"}
        type={"password"}
        onChange={onChangePassword}
        value={passwordValue}
        errorMsg={passwordValid.errorMsg}
      />

      <FindAccountLink />
      <LoginBtn
        type='submit'
        disabled={!(emailValid.valid && passwordValid.valid)}
      >
        로그인
      </LoginBtn>
      <SignupLink />

      <SocialLoginBtns
        buttonTypeArr={["google", "github"]}
        textArr={["구글 계정으로 로그인", "깃 허브 계정으로 로그인"]}
        onClickArr={[
          () => socialLoginHandler("google"),
          () => socialLoginHandler("github")
        ]}
      />
    </Form>
  );
}
```

**react-hook-form 적용 후 코드**

formProvider 사용으로 버튼 제어를 위한 input 값들의 의존성 분리 가능

=> input별로 컴포넌트 세분화 (email, password) 가능

```javascript
// LoginForm.tsx
import React from "react";
import { useLoginDataFetch } from "../../../hook/logic/login/useLoginDataFetch";
import { MyForm } from "../../../component/commons/UI/myForm/MyForm";
import LoginFormContent from "./LoginFormContent/LoginFormContent";

export default function LoginForm() {
  const { loginIsPending, loginHandler, loginError } = useLoginDataFetch();

  return (
    <MyForm
      onSubmit={loginHandler}
      formOptions={{
        mode: "onChange",
        defaultValues: { email: "", password: "" }
      }}
    >
      <LoginFormContent
        loginError={loginError}
        loginIsPending={loginIsPending}
      />
    </MyForm>
  );
}
```

```javascript
// LoginFormContent.tsx
import React from "react";
import { FormContentWrapper } from "../../login.styles";
import LoginFormTitle from "./LoginFormTitle/LoginFormTitle";
import LoginEmail from "./LoginEmailField/LoginEmail";
import LoginPassword from "./LoginPasswordField/LoginPassword";
import FindAccountLink from "./FindAccountLink/FindAccountLink";
import LoginError from "./LoginError/LoginError";
import LoginBtn from "./LoginBtn/LoginBtn";
import SignupLink from "./SignupLink/SignupLink";
import { SocialLogin } from "./socialLogin/SocialLogin";

interface IProps {
  loginError: Error | null;
  loginIsPending: boolean;
}
export default function LoginFormContent({
  loginError,
  loginIsPending
}: IProps) {
  return (
    <FormContentWrapper>
      <LoginFormTitle />

      <LoginEmail />

      <LoginPassword />

      <FindAccountLink />

      {<LoginError isError={loginError} />}

      <LoginBtn loginIsPending={loginIsPending} />

      <SignupLink />

      <SocialLogin />
    </FormContentWrapper>
  );
}
```

```javascript
// LoginFormTitle.tsx
import React from "react";
import { resolveWebp } from "../../../../../library/resolveWebp";
import { FormTitle } from "../../../login.styles";

export default function LoginFormTitle() {
  return (
    <FormTitle>
      <img src={resolveWebp("/assets/webp/icon-loginLogo.webp", "svg")} />
    </FormTitle>
  );
}
```

```javascript
// LoginEmail.tsx
import React from "react";
import { InputField } from "../../../../../component/commons/UI/InputField/InputField";
import {
  emailRegex,
  emailRegexErrorMsg
} from "../../../../../library/validationRegex";

export default function LoginEmail() {
  return (
    <InputField
      label_hidden={true}
      label={"이메일"}
      name={"email"}
      id={"input-email"}
      placeholder={"Email"}
      type={"email"}
      pattern={{
        value: emailRegex,
        message: emailRegexErrorMsg
      }}
      duplicationErrorMsg={"중복된 이메일 입니다."}
      required={true}
    />
  );
}
```

```javascript
// LoginPassword.tsx
import { InputField } from "../../../../../component/commons/UI/InputField/InputField";
import {
  passwordRegex,
  passwordRegexErrorMsg
} from "../../../../../library/validationRegex";

export default function LoginPassword() {
  return (
    <InputField
      label_hidden={true}
      label={"비밀번호"}
      name={"password"}
      id={"input-password"}
      placeholder={"Password"}
      type={"password"}
      pattern={{
        value: passwordRegex,
        message: passwordRegexErrorMsg
      }}
      required={true}
    />
  );
}
```

```javascript
// FindAccountLink.tsx
import React from "react";
import { Line, StyledFindAccountLink } from "../../../login.styles";

export default function FindAccountLink() {
  return (
    <StyledFindAccountLink to={"/findAccount"}>
      이메일 <Line /> 비밀번호 찾기
    </StyledFindAccountLink>
  );
}
```

```javascript
// LoginError.tsx
import React from "react";
import ErrorMsg from "../../../../../component/commons/errorMsg/ErrorMsg";
import { useLoginError } from "../../../../../hook/logic/login/useLoginError";
import { useFormContext } from "react-hook-form";

interface IProps {
  isError: Error | null;
}

export default function LoginError({ isError }: IProps) {
  const { getValues, reset } = useFormContext();
  const email = getValues("email");
  const password = getValues("password");
  const { error } = useLoginError({ email, password, reset, isError });

  return error ? <ErrorMsg message={error} /> : null;
}
```

```javascript
// LoginBtn.tsx
import React from "react";
import { StyledLoginBtn } from "../../../login.styles";
import { useFormContext } from "react-hook-form";

interface IProps {
  loginIsPending: boolean;
}
export default function LoginBtn({ loginIsPending }: IProps) {
  const { formState } = useFormContext();

  return (
    <StyledLoginBtn
      type='submit'
      disabled={!formState.isValid || loginIsPending}
    >
      {loginIsPending ? "로그인중..." : "로그인"}
    </StyledLoginBtn>
  );
}
```

```javascript
// SignupLink.tsx
import React from "react";
import { SignupLinkWrapper, StyledSignupLink } from "../../../login.styles";

export default function SignupLink() {
  return (
    <SignupLinkWrapper>
      아직 회원이 아닌가요?
      <StyledSignupLink to={"/signup"}>회원가입</StyledSignupLink>
    </SignupLinkWrapper>
  );
}
```

```javascript
// SocialLoginBtns.tsx
import Loading from "../../../../../component/commons/loading/Loading";
import { useSocialLoginDataFetch } from "../../../../../hook/logic/login/useSocialLoginDataFetch";
import { SocialLoginWrapper } from "../../../login.styles";
import SocialLoginBtn from "./SocialLoginBtn/SocialLoginBtn";

export const SocialLogin = () => {
  const { socialLoginHandler, socialLoginIsPending } =
    useSocialLoginDataFetch();

  if (socialLoginIsPending) {
    return <Loading />;
  }

  return (
    <SocialLoginWrapper>
      <SocialLoginBtn
        loginType='google'
        socialLoginHandler={socialLoginHandler}
        btnText='구글 계정으로 로그인'
      />

      <SocialLoginBtn
        loginType='github'
        socialLoginHandler={socialLoginHandler}
        btnText='깃 허브 계정으로 로그인'
      />
    </SocialLoginWrapper>
  );
};
```

</details>

<br>

#### 🪜 회원가입 useFunnel 적용
**useFunnel**은여러 단계로 이루어진 컴포넌트를 상태와 흐름을 한번에 관리하기 위해 toss에서 개발한 라이브러리입니다.

(🔗 공식사이트: https://slash.page/ko/libraries/react/use-funnel/readme.i18n/)

> 적용 이유
- 여러 단계가 존재하는 회원가입 페이지를 흐름 파악이 용이하고, 가독성 좋은 클린 코드로 만들기 위해 적용하였습니다.

> 적용 방식
- useFunnel customhook를 생성하여 회원가입 컴포넌트에 회원가입 단계별 컴포넌트를 관리하는 방식으로 적용하였습니다.
- react-hook-form의 formProvider를 이용하여 각 단계별 input 값들을 공유할 수 있도록 하였습니다.
- 기존 useFunnel customhook에 Step를 관리하도록 setpIndex 상태와 prevStepHandler, nextStepHandler 함수를 추가하였습니다.

<details>
<summary>useFunnel 코드</summary>

<!--summary 아래 빈칸 공백 두고 내용을 적는공간-->

```javascript
import React, { ReactElement, ReactNode, useState } from "react";

export interface StepProps {
  name: string;
  children: ReactNode;
}

export interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}

export const useFunnel = (steps: string[]) => {
  // state를 통해 현재 스텝을 관리
  // setStep 함수를 통해 현재 스텝을 변경
  const [step, setStep] = useState(steps[0]);

  // step index를 관리한다.
  const [setpIndex, setStepIndex] = useState(0);

  // 이전 스텝으로 돌아간다.
  const prevStepHandler = () => {
    setStepIndex((prev) => prev - 1);
    setStep(steps[setpIndex - 1]);
  };

  // 다음 스텝으로 넘어간다.
  const nextStepHandler = () => {
    setStepIndex((prev) => prev + 1);
    setStep(steps[setpIndex + 1]);
  };

  // 각 단계를 나타내는 Step 컴포넌트
  // children을 통해 각 스텝의 컨텐츠를 렌더링 
  const Step = (props: StepProps): ReactElement => {
    return <>{props.children}</>;
  };

  // 여러 단계의 Step 컴포넌트 중 현재 활성화된 스텝을 렌더링하는 Funnel
  // find를 통해 Step 중 현재 Step을 찾아 렌더링
  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = children.find(
      (childStep) => childStep.props.name === step
    );

    return <>{targetStep}</>;
  };

  return {
    Funnel,
    Step,
    setStep,
    currentStep: step,
    nextStepHandler,
    prevStepHandler
  } as const;
};

```

</details>

> 적용후 얻는 이점
- 이전 코드에 비해 코드의 가독성이 좋아졌으며, 회원가입 단계별 흐름 파악이 용이해졌습니다.
- input들의 상태를 하나의 form에서 관리하기 때문에 상태 관리가 편리해졌습니다.

> 코드 비교
<details>
<summary>코드 보기</summary>

<!--summary 아래 빈칸 공백 두고 내용을 적는공간-->

<br/>

**이전 코드**
```javascript
import React from "react";
import UserInfoSetting from "./userInfoSetting/UserInfoSetting";
import ProfileSetting from "./profileSetting/ProfileSetting";
import Loading from "../../component/commons/loading/Loading";
import { useUserInfoSettingEmailInput } from "../../hook/logic/signup/useUserInfoSettingEmailInput";
import { useUserInfoSettingPwInput } from "../../hook/logic/signup/useUserInfoSettingPwInput";
import { useUserInfoSettingPwChkInput } from "../../hook/logic/signup/useUserInfoSettingPwChkInput";
import { useUserInfoSettingPhoneInput } from "../../hook/logic/signup/useUserInfoSettingPhoneInput";
import { useSignupStepController } from "../../hook/logic/signup/useSignupStepController";
import { useProfileSettingDisplayNameInput } from "../../hook/logic/signup/useProfileSettingDisplayNameInput";
import { useProfileSettingImg } from "../../hook/logic/signup/useProfileSettingImg";
import { useSignupDataFetch } from "../../hook/logic/signup/useSignupDataFetch";
import { useProfileSettingIntroduceInput } from "../../hook/logic/signup/useProfileSettingIntroduceInput";
import { useSingupSetScreenSize } from "../../hook/logic/signup/useSignupSetScreenSize";
import ProgressBar from "./progressBar/ProgressBar";
import { FormWrapper, Title, Wrapper } from './signup.styles';

export default function Signup() {
  const { emailValue, emailValid, onChangeEmail } =
    useUserInfoSettingEmailInput();

  const {
    passwordValue,
    passwordValid,
    onChangePassword,
    checkPwMatchValidation
  } = useUserInfoSettingPwInput();

  const {
    passwordChkValue,
    passwordChkValid,
    onChangePasswordChk,
    checkPwChkMatchValidation
  } = useUserInfoSettingPwChkInput();

  const { phoneValue, phoneValid, onChangePhone } =
    useUserInfoSettingPhoneInput();

  const { displayNameValue, displayNameValid, onChangeDislayName } =
    useProfileSettingDisplayNameInput();

  const {
    imgInputRef,
    previewImg,
    uploadImg,
    isImgLoading,
    changeImgHandler,
    imgResetHandler
  } = useProfileSettingImg();

  const { introduceValue, onChangeIntroduce, preventKeydownEnter } =
    useProfileSettingIntroduceInput();

  const { signupHandler, signupLoading } = useSignupDataFetch({
    displayNameValue,
    uploadImg,
    emailValue,
    passwordValue,
    phoneValue,
    introduceValue
  });

  const {
    next,
    percentage,
    setPercentage,
    nextStepHandler,
    prevStepHandler,
    cancelHandler,
    completedUserInfoSetting,
    completedProfileSetting
  } = useSignupStepController({
    emailValid: emailValid.valid,
    passwordValid: passwordValid.valid,
    passwordChkValid: passwordChkValid.valid,
    phoneValid: phoneValid.valid,
    displayNameValid: displayNameValid.valid
  });

  if (signupLoading) {
    return <Loading />;
  }

  // next(기본 정보 입력 후 다음 버튼을 누른 경우)
  const SignupForm = !next ? (
    <UserInfoSetting
      emailValue={emailValue}
      onChangeEmail={onChangeEmail}
      emailValid={emailValid}
      passwordValue={passwordValue}
      onChangePassword={onChangePassword}
      checkPwMatchValidation={checkPwMatchValidation}
      passwordValid={passwordValid}
      passwordChkValue={passwordChkValue}
      onChangePasswordChk={onChangePasswordChk}
      checkPwChkMatchValidation={checkPwChkMatchValidation}
      passwordChkValid={passwordChkValid}
      phoneValue={phoneValue}
      onChangePhone={onChangePhone}
      phoneValid={phoneValid}
      nextDisabled={
        !(
          emailValid.valid &&
          passwordChkValid.valid &&
          passwordValid.valid &&
          phoneValid.valid
        )
      }
      nextStepHandler={nextStepHandler}
      cancelHandler={cancelHandler}
    />
  ) : (
    <ProfileSetting
      setPercentage={setPercentage}
      prevStepHandler={prevStepHandler}
      signupHandler={signupHandler}
      imgInputRef={imgInputRef}
      changeImgHandler={changeImgHandler}
      previewImg={previewImg}
      imgResetHandler={imgResetHandler}
      displayNameValue={displayNameValue}
      onChangeDislayName={onChangeDislayName}
      introduce={introduceValue}
      onChangeIntroduce={onChangeIntroduce}
      displayNameValid={displayNameValid}
      signupDisabled={
        !(
          emailValid.valid &&
          passwordChkValid.valid &&
          passwordValid.valid &&
          phoneValid.valid &&
          displayNameValid.valid
        )
      }
      isImgLoading={isImgLoading}
      preventKeydownEnter={preventKeydownEnter}
    />
  );

  // 모바일 화면 100vh 높이 설정시 화면 스크롤 문제 해결
  useSingupSetScreenSize();

  return (
    <Wrapper>
      <Title>회원가입</Title>
      <ProgressBar
        percentage={percentage}
        completedUserInfoSetting={completedUserInfoSetting}
        completedProfileSetting={completedProfileSetting}
      />
      <FormWrapper>{SignupForm}</FormWrapper>
    </Wrapper>
  );
}
```

```javascript
// UserInfoSetting.tsx
import React from "react";
import { InputField } from "../../../component/commons/UI/InputField";
import { CancelBtn, SignupBtn, SignupForm } from '../signup.styles';

interface IProps {
  emailValue: string;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emailValid: {
    errorMsg: string;
    valid: boolean;
  };
  passwordValue: string;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordValid: {
    errorMsg: string;
    valid: boolean;
  };
  checkPwMatchValidation: (
    e: React.ChangeEvent<HTMLInputElement>,
    passwordChkValue: string
  ) => void;
  passwordChkValue: string;
  onChangePasswordChk: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordChkValid: {
    errorMsg: string;
    valid: boolean;
  };
  checkPwChkMatchValidation: (
    e: React.ChangeEvent<HTMLInputElement>,
    passwordValue: string
  ) => void;
  phoneValue: string;
  onChangePhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  phoneValid: {
    errorMsg: string;
    valid: boolean;
  };
  nextStepHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  nextDisabled: boolean;
  cancelHandler: () => void;
}

export default function UserInfoSetting({
  emailValue,
  onChangeEmail,
  emailValid,
  passwordValue,
  onChangePassword,
  checkPwMatchValidation,
  passwordValid,
  passwordChkValue,
  onChangePasswordChk,
  checkPwChkMatchValidation,
  passwordChkValid,
  phoneValue,
  onChangePhone,
  phoneValid,
  nextStepHandler,
  nextDisabled,
  cancelHandler
}: IProps) {
  return (
    <SignupForm onSubmit={nextStepHandler}>
      <InputField
        type='text'
        label={"이메일 (필수)"}
        name={"email"}
        id={"input-email"}
        placeholder={"이메일 주소를 입력해주세요."}
        value={emailValue}
        onChange={onChangeEmail}
        errorMsg={emailValid.errorMsg}
      />
      <InputField
        type='password'
        label={"비밀번호 (필수)"}
        name={"password"}
        id={"input-password"}
        placeholder={"8-16자 특수문자, 숫자, 영문 포함"}
        value={passwordValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChangePassword(e);
          checkPwMatchValidation(e, passwordChkValue);
        }}
        minLength={8}
        maxLength={16}
        errorMsg={passwordValid.errorMsg}
      />
      <InputField
        type='password'
        label={"비밀번호 확인 (필수)"}
        name={"password"}
        id={"input-passwordChk"}
        placeholder={"비밀번호 확인을 입력해주세요."}
        value={passwordChkValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChangePasswordChk(e);
          checkPwChkMatchValidation(e, passwordValue);
        }}
        minLength={8}
        maxLength={16}
        errorMsg={passwordChkValid.errorMsg}
      />
      <InputField
        type='text'
        label={"휴대폰 (필수)"}
        name={"phone"}
        id={"input-phone"}
        placeholder={"휴대폰 번호를 입력해주세요. ( - 제외 )"}
        value={phoneValue
          .replace(/[^0-9]/g, "")
          .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
        onChange={onChangePhone}
        maxLength={13}
        errorMsg={phoneValid.errorMsg}
      />
      <SignupBtn type='submit' disabled={nextDisabled}>
        다음
      </SignupBtn>
      <CancelBtn type='button' onClick={cancelHandler}>
        취소
      </CancelBtn>
    </SignupForm>
  );
}
```

```javascript
// ProfileSetting.tsx
import React from "react";
import TextAreaField from "../../../component/commons/UI/TextAreaField";
import ProfileSettingImg from "./profileSettingImg/ProfileSettingImg";
import { InputField } from "../../../component/commons/UI/InputField";
import styled from "styled-components";

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const SignupBtn = styled.button`
  width: 100%;
  background-color: ${(props) => (props.disabled ? "#cbcbcb" : "gold")};
  cursor: ${(props) => (props.disabled ? "default" : "cursor")};
  padding: 14px 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  transition: all 0.5s;
`;

const PrevBtn = styled.button`
  width: 100%;
  background-color: #eee;
  padding: 14px 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #111;
`;

interface IProps {
  setPercentage: React.Dispatch<React.SetStateAction<string>>;
  prevStepHandler: () => void;
  signupHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  imgInputRef: React.RefObject<HTMLInputElement>;
  changeImgHandler: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  previewImg: string;
  imgResetHandler: () => void;
  displayNameValue: string;
  onChangeDislayName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  introduce: string;
  onChangeIntroduce: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  displayNameValid: {
    errorMsg: string;
    valid: boolean;
  };
  signupDisabled: boolean;
  isImgLoading: boolean;
  preventKeydownEnter: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function ProfileSetting({
  prevStepHandler,
  signupHandler,
  imgInputRef,
  changeImgHandler,
  previewImg,
  imgResetHandler,
  displayNameValue,
  onChangeDislayName,
  introduce,
  onChangeIntroduce,
  displayNameValid,
  signupDisabled,
  isImgLoading,
  preventKeydownEnter
}: IProps) {
  return (
    <SignupForm onSubmit={signupHandler}>
      <ProfileSettingImg
        imgInputRef={imgInputRef}
        changeImgHandler={changeImgHandler}
        previewImg={previewImg}
        imgResetHandler={imgResetHandler}
        isImgLoading={isImgLoading}
      />

      <InputField
        type='text'
        label={"닉네임 (필수)"}
        name={"nickname"}
        id={"input-nickname"}
        placeholder={"4-10자 영문, 영문 + 숫자"}
        value={displayNameValue}
        onChange={onChangeDislayName}
        minLength={4}
        maxLength={10}
        errorMsg={displayNameValid.errorMsg}
      />

      <TextAreaField
        label={"자기소개"}
        label_hidden={true}
        name={"introduce"}
        id={"input-nickname"}
        placeholder={"최대 100자까지 작성 가능합니다."}
        value={introduce}
        onChange={onChangeIntroduce}
        onKeyDown={preventKeydownEnter}
        maxLength={100}
      />

      <SignupBtn type='submit' disabled={signupDisabled}>
        회원가입
      </SignupBtn>
      <PrevBtn
        className='prev'
        type='button'
        onClick={() => {
          prevStepHandler();
        }}
      >
        이전
      </PrevBtn>
    </SignupForm>
  );
}
```

**useFuneel 적용 코드**
```javascript
// Signup.tsx
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
```

```javascript
// FormContent.tsx
import React from "react";
import { FormContentWrapper } from "../signup.styles";
import { useFunnel } from "../../../hook/useFunnel";
import UserInfoSetting from "./userInfoSetting/UserInfoSetting";
import ProfileSetting from "./profileSetting/ProfileSetting";
import ProgressBar from "../progressBar/ProgressBar";

export default function FormContent() {
  const steps = ["userInfoSetting", "profileSetting"];
  const { Funnel, Step, currentStep, prevStepHandler, nextStepHandler } = useFunnel(steps);

  return (
    <FormContentWrapper>
      <ProgressBar currentStep={currentStep} steps={steps}
      />
      <Funnel>
        <Step name='userInfoSetting'>
          <UserInfoSetting nextStepHandler={nextStepHandler} />
        </Step>

        <Step name='profileSetting'>
          <ProfileSetting prevStepHandler={prevStepHandler} />
        </Step>
      </Funnel>
    </FormContentWrapper>
  );
}
```

```javascript
// ProfileSetting.tsx
import React from "react";
import { FieldWrapper, PrevBtn } from "../../signup.styles";
import IntroduceField from "./intorduceField/IntroduceField";
import DisplayNameField from "./displayNameField/DisplayNameField";
import ProfileImgField from "./profileImgField/ProfileImgField";
import SignupBtn from './signupBtn/SignupBtn';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { signupSlice } from "../../../../slice/signupSlice";

interface IProps {
  prevStepHandler: () => void;
}

export default function ProfileSetting({ prevStepHandler }: IProps) {
  const dispatch = useDispatch<AppDispatch>();
  const minusPercentageHandler = () => {
    dispatch(signupSlice.actions.minusPercentage(50));
  };
  return (
    <>
      <FieldWrapper>
        <ProfileImgField />

        <DisplayNameField />

        <IntroduceField />

        <PrevBtn
          onClick={() => {
            prevStepHandler();
            minusPercentageHandler();
          }}
        >
          이전
        </PrevBtn>
        <SignupBtn />
      </FieldWrapper>
    </>
  );
}
```

```javascript
// UserInfoSetting.tsx
import React from "react";
import { FieldWrapper } from "../../signup.styles";
import EmailField from "./emailField/EmailField";
import PasswordField from "./passwordField/PasswordField";
import PasswordChkField from "./passwordChkField/PasswordChkField";
import PhoneField from "./phoneField/PhoneField";
import NextBtn from "./nextBtn/NextBtn";

interface IProps {
  nextStepHandler: () => void;
}
export default function UserInfoSetting({ nextStepHandler }: IProps) {

  return (
    <FieldWrapper>
      <EmailField />

      <PasswordField />

      <PasswordChkField />

      <PhoneField />

      <NextBtn
        nextStepHandler={nextStepHandler}
      />
    </FieldWrapper>
  );
}
```
</details>


<br>

### ⚙ 개발환경
|프론트엔드|벡엔드|디자인|배포, 관리|
|---|---|---|---|
|<img alt="Html" src ="https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white"/> <img alt="CSS" src ="https://img.shields.io/badge/CSS3-1572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=white"/> <img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=black"/> <img alt="TypeScript" src ="https://img.shields.io/badge/TypeScript-3178C6.svg?&style=for-the-badge&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/redux-toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=fff"> <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=fff"> <img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=pink"> |<img src ="https://img.shields.io/badge/naverSerachAPI-03C75A.svg?&style=for-the-badge&logo=naver&logoColor=white"/> <img src ="https://img.shields.io/badge/KakamapAPI-FFCD00.svg?&style=for-the-badge&logo=googlemaps&logoColor=black"/> <img src ="https://img.shields.io/badge/firebase-FFCA28.svg?&style=for-the-badge&logo=firebase&logoColor=black"/>|<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" width=150>|<img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">|

<br>

### 🔩 벡엔드 & API
- 네이버 검색 API를 통해 맛집 검색 기능을 구현하였습니다.
- 네이버 검색 API로 얻은 맛집 정보와 좌표를 KakaMapAPI에 전달하여 지도를 그리고, 마커로 해당 맛집을 표시하도록 구현하였습니다.
- 파이어베이스를 이용하여 db를 구성하고, 로그인, 로그아웃, 게시물, 댓글, 답글, 프로필 등 주요 기능 API를 구현하였습니다.

<br>

### ⛓ 아키텍처
![architecture](https://github.com/NamJongtae/TasteMap/assets/113427991/6154f0ba-bedd-42af-9115-e5704cb9e40f)

<br>

### 🚩 User Flow ( 이미지를 클릭 해주세요. )
![userFlow](https://github.com/NamJongtae/TasteMap/assets/113427991/cfebd74e-dd6d-45c6-9bee-56e6662d2380)

<br>

### 🛠 프로젝트 관리
- <a href="https://github.com/NamJongtae/TasteMap/issues?q=is%3Aissue+is%3Aclosed">GitHub Issue</a>
  - 빠른 issue 생성을 위해 issue 템플릿을 만들어 사용하였습니다.
  - issue label을 생성하여 어떤 작업을 히는지 구분하였습니다.
  - issue를 통해 구현할 내용과 체크리스트를 만들어 어떤 작업을 할지 리스트 만들어 관리하였습니다.
  
![issue](https://github.com/NamJongtae/TasteMap/assets/113427991/2064d7af-9224-47a2-ae65-f89854abb9b8)

- <a href="https://github.com/users/NamJongtae/projects/4">GitHub Project</a>
  - 프로젝트 보드의 이슈 목록을 통해 개발 과정과 진행 상황을 한 눈에 알아 볼 수 있습니다.
  
![board](https://github.com/NamJongtae/TasteMap/assets/113427991/506be4b3-71d5-4a14-ab74-17811e071f64)

### 📃 GitHub 컨벤션
어떤 작업을 했는지 파악하기 위해 컨벤션을 정하여 commit과 isuue를 관리하였습니다.

`Fix` : 수정사항만 있을 경우

`Feat` : 새로운 기능이 추가 되거나 여러 변경 사항들이 있을 경우

`Style` : 스타일만 변경되었을 경우 

`Docs` : 문서를 수정한 경우

`Refactor` : 코드 리팩토링을 하는 경우

`Remove` : 파일을 삭제하는 작업만 수행한 경우

`Rename` : 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우

`Relese` : 배포 관련 작업인 경우

`Chore` : 그 외 기타 사항이 있을 경우 사용합니다.

<br>

### 👀 구현 기능 미리보기 ( 제목 클릭 시 해당 기능 상세설명으로 이동됩니다. )
|[🔗 로그인](https://github.com/NamJongtae/TasteMap/wiki/%EA%B8%B0%EB%8A%A5%EB%B3%84-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%8E%98%EC%9D%B4%EC%A7%80)|[🔗 회원가입](https://github.com/NamJongtae/TasteMap/wiki/%EA%B8%B0%EB%8A%A5%EB%B3%84-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%ED%8E%98%EC%9D%B4%EC%A7%80)|[🔗 아이디/비밀번호 찾기](https://github.com/NamJongtae/TasteMap/wiki/%EA%B8%B0%EB%8A%A5%EB%B3%84-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EC%9D%B4%EB%A9%94%EC%9D%BC--%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8-%EC%B0%BE%EA%B8%B0-%ED%8E%98%EC%9D%B4%EC%A7%80)|
|---|---|---|
|![로그인](https://github.com/NamJongtae/TasteMap/assets/113427991/9345a44f-4220-4c13-81f1-40c1b639d032)|![회원가입](https://github.com/NamJongtae/TasteMap/assets/113427991/e724a7e2-4332-4cb3-9301-2fa4698facfd)|![계정찾기](https://github.com/NamJongtae/TasteMap/assets/113427991/c6ca8fdc-b86d-4421-bac6-302ba839bfca)|

|[🔗 게시물 조회](https://github.com/NamJongtae/TasteMap/wiki/%EA%B8%B0%EB%8A%A5%EB%B3%84-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EA%B2%8C%EC%8B%9C%EB%AC%BC-%EC%A1%B0%ED%9A%8C)|[🔗 게시물 업로드](https://github.com/NamJongtae/TasteMap/wiki/%EA%B8%B0%EB%8A%A5%EB%B3%84-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EA%B2%8C%EC%8B%9C%EB%AC%BC-%EC%97%85%EB%A1%9C%EB%93%9C)|[🔗 게시물 수정](https://github.com/NamJongtae/TasteMap/wiki/%EA%B8%B0%EB%8A%A5%EB%B3%84-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EA%B2%8C%EC%8B%9C%EB%AC%BC-%EC%88%98%EC%A0%95)|
|:---:|:---:|:---:|
|![게시물 조회](https://github.com/NamJongtae/TasteMap/assets/113427991/27a7d40b-7cbe-4295-ba1e-f8c531b635bd)|![게시물 업로드](https://github.com/NamJongtae/TasteMap/assets/113427991/d5e7e011-ceeb-4b9d-a301-8d8fc25762c8)|![게시물 수정](https://github.com/NamJongtae/TasteMap/assets/113427991/8d95c2a6-a143-4714-b951-12a5d81f45be)|

|[🔗 게시물 삭제](https://github.com/NamJongtae/TasteMap/wiki/%EA%B8%B0%EB%8A%A5%EB%B3%84-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EA%B2%8C%EC%8B%9C%EB%AC%BC-%EC%82%AD%EC%A0%9C)|[🔗 게시물 신고](https://github.com/NamJongtae/TasteMap/wiki/%EA%B8%B0%EB%8A%A5%EB%B3%84-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EA%B2%8C%EC%8B%9C%EB%AC%BC-%EC%8B%A0%EA%B3%A0)|[🔗 맛집추가, 좋아요](https://github.com/NamJongtae/TasteMap/wiki/%EA%B8%B0%EB%8A%A5%EB%B3%84-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EB%A7%9B%EC%A7%91-%EC%B6%94%EA%B0%80-%EC%A2%8B%EC%95%84%EC%9A%94)|
|---|---|---|
|![게시물 삭제](https://github.com/NamJongtae/TasteMap/assets/113427991/e7d2924f-807c-4615-823d-dca10776bbab)|![게시물 신고](https://github.com/NamJongtae/TasteMap/assets/113427991/2fb0cbd9-6dbc-4e55-b442-dc7bba5501ca)|![맛집추가, 좋아요](https://github.com/NamJongtae/TasteMap/assets/113427991/a402813c-0377-4fc1-a608-84b8280a1a8f)|

|[🔗 댓글, 답글](https://github.com/NamJongtae/TasteMap/wiki/%EA%B8%B0%EB%8A%A5%EB%B3%84-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EB%8C%93%EA%B8%80-%EB%8B%B5%EA%B8%80)|[🔗 프로필 페이지](https://github.com/NamJongtae/TasteMap/wiki/%EA%B8%B0%EB%8A%A5%EB%B3%84-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%ED%94%84%EB%A1%9C%ED%95%84-%ED%8E%98%EC%9D%B4%EC%A7%80)|[🔗 팔로우, 팔로잉](https://github.com/NamJongtae/TasteMap/wiki/%EA%B8%B0%EB%8A%A5%EB%B3%84-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%ED%8C%94%EB%A1%9C%EC%9A%B0-%ED%8C%94%EB%A1%9C%EC%9E%89)|
|---|---|---|
|![댓글,답글](https://github.com/NamJongtae/TasteMap/assets/113427991/5d2ae00d-4ace-42d8-ae88-2a1a31ae4cd9)|![프로필 페이지](https://github.com/NamJongtae/TasteMap/assets/113427991/a7b3e3aa-8701-49a4-b614-326b58def7d4)|![팔로우, 팔로잉](https://github.com/NamJongtae/TasteMap/assets/113427991/d8139b61-5f2c-4cff-89dc-ee03d8a22a0c)|
<div align="center">
  
|[🔗 프로필 수정](https://github.com/NamJongtae/TasteMap/wiki/%EA%B8%B0%EB%8A%A5%EB%B3%84-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%ED%94%84%EB%A1%9C%ED%95%84-%EC%88%98%EC%A0%95)|[🔗 맛집지도](https://github.com/NamJongtae/TasteMap/wiki/%EA%B8%B0%EB%8A%A5%EB%B3%84-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EB%A7%9B%EC%A7%91%EC%A7%80%EB%8F%84)|[🔗 검색](https://github.com/NamJongtae/TasteMap/wiki/%EA%B8%B0%EB%8A%A5%EB%B3%84-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EA%B2%80%EC%83%89)|
|---|---|---|
|![프로필 수정](https://github.com/NamJongtae/TasteMap/assets/113427991/1f19f36f-e9c6-4245-9022-dbc085f0a1b8)|![맛집지도](https://github.com/NamJongtae/TasteMap/assets/113427991/eeb5b9ca-b58e-4a7d-8842-6560721d3353)|![검색](https://github.com/NamJongtae/TasteMap/assets/113427991/6df4a19e-21ff-4a27-ab96-5e93910a7d51)|

|[🔗 로그아웃](https://github.com/NamJongtae/TasteMap/wiki/%EA%B8%B0%EB%8A%A5%EB%B3%84-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EB%A1%9C%EA%B7%B8%EC%95%84%EC%9B%83)|[🔗 404 페이지](https://github.com/NamJongtae/TasteMap/wiki/%EA%B8%B0%EB%8A%A5%EB%B3%84-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#404)|
|---|---|
|![로그아웃](https://github.com/NamJongtae/TasteMap/assets/113427991/635b35e4-f1d0-4325-9f69-52fa4c3c02ce)|![404](https://github.com/NamJongtae/TasteMap/assets/113427991/830a1146-2967-4d80-8c4d-d0ed94503851)|

<p align="right"><a href="#top">TOP 🔼</a></p>

</div>


