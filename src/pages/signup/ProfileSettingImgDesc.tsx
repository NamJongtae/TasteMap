import React from "react";
import styled from "styled-components";

const ProfileImgDescList = styled.ul`
  padding: 20px 10px;
  display: table;
  margin: 0 auto;
`;

const ProfileImgDescItem = styled.li`
  color: #4c4d4f;
  line-height: 1.5;
  font-size: 12px;
  word-break: keep-all;
  @media screen and (max-width: 362px) {
    font-size: 11px;
  }
`;

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
