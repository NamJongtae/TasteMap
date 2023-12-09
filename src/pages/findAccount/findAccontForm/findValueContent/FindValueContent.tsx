import React from "react";
import {
  FindInfoDate,
  FindInfoText,
  FindInfoWrapper
} from "../../findAccount.styles";
interface IProps {
  findEmailValue: { email: string; createdAt: string } | undefined;
  isFindPassword: boolean | undefined;
}
export default function FindValueContent({
  findEmailValue,
  isFindPassword
}: IProps) {
  return (
    <FindInfoWrapper>
      {findEmailValue && (
        <>
          <FindInfoText>입력한 정보와 일치하는 이메일 정보입니다.</FindInfoText>
          <FindInfoText>{`이메일 : ${findEmailValue.email}`}</FindInfoText>
          <FindInfoText>
            가입일 :{" "}
            <FindInfoDate dateTime={findEmailValue.createdAt}>
              {findEmailValue.createdAt}
            </FindInfoDate>
          </FindInfoText>
        </>
      )}
      {isFindPassword && (
        <FindInfoText>
          {
            "가입된 메일로 비밀번호 변경 메일을 발송하였습니다.\n메일이 없을 경우 스팸 메일함을 확인해주세요."
          }
        </FindInfoText>
      )}
    </FindInfoWrapper>
  );
}
