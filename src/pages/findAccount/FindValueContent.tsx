import React from "react";
import styled from "styled-components";

export const FindInfoWrapper = styled.div`
  padding: 20px;
  border: 2px solid #b5b5b5;
  width: 100%;
  line-height: 2;
  font-size: 14px;
  white-space: pre-line;
  text-align: center;
  @media screen and (max-width: 448px) {
    padding: 20px 10px;
    font-size: 14px;
  }
  @media screen and (max-width: 361px) {
    padding: 20px 8px;
    font-size: 12px;
  }
`;
export const FindInfoText = styled.p``;
export const FindInfoDate = styled.time``;

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
