import React from "react";
import { UpdateBtn } from "../../ProfileUpdateModal.styles";

interface IProps {
  updateUserProfileLoading: boolean;
  isDisabledUpdateBtn: boolean;
  updateBtnRef: React.RefObject<HTMLButtonElement>;
}
export default function ProfileUpdateBtn({
  updateUserProfileLoading,
  isDisabledUpdateBtn,
  updateBtnRef
}: IProps) {
  return (
    <UpdateBtn type='submit' disabled={isDisabledUpdateBtn} ref={updateBtnRef}>
      {updateUserProfileLoading ? "프로필 업데이트중..." : "프로필 수정"}
    </UpdateBtn>
  );
}
