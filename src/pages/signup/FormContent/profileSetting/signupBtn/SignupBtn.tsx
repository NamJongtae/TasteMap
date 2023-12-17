import React from "react";
import { FormBtn } from '../../../signup.styles';
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from '../../../../../store/store';

export default function SignupBtn() {
  const { formState } = useFormContext();
  const checkDisplayNameDuplication = useSelector(
    (state: RootState) => state.signup.checkDisplayNameDuplication
  );

  return (
    <FormBtn
      disabled={!formState.isValid || !checkDisplayNameDuplication}
      type='submit'
    >
      회원가입
    </FormBtn>
  );
}