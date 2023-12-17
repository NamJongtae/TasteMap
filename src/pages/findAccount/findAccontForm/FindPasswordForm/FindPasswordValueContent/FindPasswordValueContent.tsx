import React from "react";
import { FindInfoText, FindInfoWrapper } from "../../../findAccount.styles";

export default function FindPasswordValueContent() {
  return (
    <FindInfoWrapper>
      <FindInfoText>
        {
          "가입된 메일로 비밀번호 변경 메일을 발송하였습니다.\n메일이 없을 경우 스팸 메일함을 확인해주세요."
        }
      </FindInfoText>
    </FindInfoWrapper>
  );
}
