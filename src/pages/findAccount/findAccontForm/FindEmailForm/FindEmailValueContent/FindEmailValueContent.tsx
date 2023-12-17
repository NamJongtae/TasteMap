import React from "react";
import {
  FindInfoDate,
  FindInfoText,
  FindInfoWrapper
} from "../../../findAccount.styles";
interface IProps {
  findEmailValue: { email: string; createdAt: string };
}
export default function FindEmailValueContent({ findEmailValue }: IProps) {
  return (
    <FindInfoWrapper>
      <FindInfoText>입력한 정보와 일치하는 이메일 정보입니다.</FindInfoText>
      <FindInfoText>{`이메일 : ${findEmailValue.email}`}</FindInfoText>
      <FindInfoText>
        가입일 :{" "}
        <FindInfoDate dateTime={findEmailValue.createdAt}>
          {findEmailValue.createdAt}
        </FindInfoDate>
      </FindInfoText>
    </FindInfoWrapper>
  );
}
