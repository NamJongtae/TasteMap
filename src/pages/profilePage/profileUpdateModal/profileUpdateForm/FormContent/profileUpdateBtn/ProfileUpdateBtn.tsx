import React from "react";
import { UpdateBtn } from "../../../ProfileUpdateModal.styles";
import { useFormContext } from "react-hook-form";

interface IProps {
  updateUserProfileLoading: boolean;
  updateBtnRef: React.RefObject<HTMLButtonElement>;
  checkDuplication: boolean;
}
export default function ProfileUpdateBtn({
  updateUserProfileLoading,
  updateBtnRef,
  checkDuplication
}: IProps) {
  const { formState } = useFormContext();
  return (
    <UpdateBtn
      type='submit'
      disabled={
        updateUserProfileLoading ||
        !formState.isDirty ||
        !checkDuplication ||
        !(Object.keys(formState.errors).length === 0)
      }
      ref={updateBtnRef}
    >
      {updateUserProfileLoading ? "프로필 업데이트중..." : "프로필 수정"}
    </UpdateBtn>
  );
}
