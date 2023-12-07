import React from "react";
import { ProfileImgDescItem, ProfileImgDescList } from './profileSettingImgDesc.styles';

export default function ProfileSettingImgDesc() {
  return (
    <ProfileImgDescList>
      <ProfileImgDescItem>
        ⦁ 이미지를 설정하지 않을 경우 기본 이미지가 적용됩니다.
      </ProfileImgDescItem>
      <ProfileImgDescItem>
        ⦁ 업로드 가능한 최대 이미지 용량은 10MB 입니다.
      </ProfileImgDescItem>
      <ProfileImgDescItem>
        ⦁ .jpg, .jpge, .png, .svg 이미지 형식을 지원합니다.
      </ProfileImgDescItem>
    </ProfileImgDescList>
  );
}
