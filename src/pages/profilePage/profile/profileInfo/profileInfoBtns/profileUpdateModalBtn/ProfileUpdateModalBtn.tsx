import React from "react";
import { ProfileBtn } from "../../profileInfo.styles";
import { useOpenProfileUpdateModal } from "../../../../../../hook/logic/profile/profileUpdateModal/useOpenProfileUpdateModal";

export default function ProfileUpdateModalBtn() {
  const { openProfileUpdateModalHandler } = useOpenProfileUpdateModal();

  return (
    <ProfileBtn onClick={openProfileUpdateModalHandler}>프로필 수정</ProfileBtn>
  );
}
