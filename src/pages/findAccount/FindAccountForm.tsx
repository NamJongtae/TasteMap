import React from "react";
import styled from "styled-components";
import FindValueContent from "./FindValueContent";
import { InputField } from "../../component/commons/UI/InputField";
import FormButton from "./FormButton";
import { useFindAccountDisplayNameInput } from "../../hook/logic/findAccount/useFindAccountDisplayNameInput";
import { useFindAccountPhoneInput } from "../../hook/logic/findAccount/useFindAccountPhoneInput";
import { useFindAccountEmailInput } from "../../hook/logic/findAccount/useFindAccountEmailInput";
import { useFindAccountEmailDataFetch } from "../../hook/logic/findAccount/useFindAccountEmailDataFetch";
import { useFindAccountPwDataFetch } from "../../hook/logic/findAccount/useFindAccountPwDataFetch";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  padding: 30px 20px;
  background: none;
  width: calc(100% - 60px);
  max-width: 400px;
  gap: 20px;
  @media screen and (max-width: 431px) {
    width: calc(100% - 40px);
    padding: 30px 20px;
  }
`;

interface IProps {
  activeMenu: "email" | "password";
}

export default function FindAccountForm({ activeMenu }: IProps) {
  // activeMenu에 따라 input 형식이 달라짐
  const { displayNameValue, displayNameValid, onChangeDisplayName } =
    useFindAccountDisplayNameInput({ activeMenu });

  const { phoneValue, phoneValid, onChangePhone } = useFindAccountPhoneInput({
    activeMenu
  });

  const { emailValue, emailValid, onChangeEmail } = useFindAccountEmailInput({
    activeMenu
  });

  // 데이터 전송을 위해  value값 필요
  // activeInput에 따라 Form 데이터 리셋
  const { findEmailHandler, findEmailValue, findEmailIsPending } =
    useFindAccountEmailDataFetch({
      activeMenu
    });

  const { findPasswordHandler, findPasswordIsPending, isFindPassword } =
    useFindAccountPwDataFetch({
      activeMenu
    });

  return (
    <Form
      onSubmit={activeMenu === "email" ? findEmailHandler : findPasswordHandler}
    >
      {findEmailValue?.email || isFindPassword ? (
        <FindValueContent
          findEmailValue={findEmailValue}
          isFindPassword={isFindPassword}
        />
      ) : (
        <>
          {activeMenu === "email" ? (
            <InputField
              label={"닉네임"}
              placeholder={"4-10자 영문, 영문+숫자 포함"}
              name={"nickname"}
              type={"text"}
              value={displayNameValue}
              onChange={onChangeDisplayName}
              minLength={4}
              maxLength={10}
              errorMsg={displayNameValid.errorMsg}
            />
          ) : (
            <InputField
              type='text'
              label={"이메일"}
              name={"email"}
              id={"input-email"}
              placeholder={"이메일을 입력해주세요."}
              value={emailValue}
              onChange={onChangeEmail}
              errorMsg={emailValid.errorMsg}
            />
          )}
          <InputField
            label={"휴대폰"}
            placeholder={"휴대폰 번호 ( - 제외 )"}
            name={"phone"}
            type={"text"}
            value={phoneValue
              .replace(/[^0-9]/g, "")
              .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
            onChange={onChangePhone}
            maxLength={13}
            errorMsg={phoneValid.errorMsg}
          />
        </>
      )}
      <FormButton
        activeMenu={activeMenu}
        isFindEmailValue={!!findEmailValue?.email}
        isFindPassword={!!isFindPassword}
        submitBtnDisabled={
          activeMenu === "email"
            ? !(displayNameValid.valid && phoneValid.valid)
            : !(emailValid.valid && phoneValid.valid)
        }
        isLoading={findEmailIsPending || findPasswordIsPending}
      />
    </Form>
  );
}
