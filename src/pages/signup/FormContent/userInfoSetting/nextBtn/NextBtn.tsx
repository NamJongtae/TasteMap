import React from "react";
import { FormBtn } from "../../../signup.styles";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";

interface IProps {
  nextStepHandler: () => void;
}
export default function NextBtn({ nextStepHandler }: IProps) {
  const { formState } = useFormContext();

  const checkEmailDuplication = useSelector(
    (state: RootState) => state.signup.checkEmailDuplication
  );
  const checkPhoneDuplication = useSelector(
    (state: RootState) => state.signup.checkPhoneDuplication
  );

  return (
    <FormBtn
      disabled={
        !formState.isValid || !checkEmailDuplication || !checkPhoneDuplication
      }
      type='button'
      onClick={nextStepHandler}
    >
      다음
    </FormBtn>
  );
}
