import React from "react";
import { BackBtn, InvalidImg, Title, Wrapper } from "./invalidPage.styles";
import { useNavigate } from "react-router-dom";
import { resolveWebp } from '../../../library/webpSupport';
interface IProps {
  text: string;
}
export default function InvalidPage({text}: IProps) {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <InvalidImg src={resolveWebp("/assets/webp/icon-cloche.webp", "svg")} />
      <Title>{text}</Title>
      <BackBtn onClick={() => navigate(-1)}>이전 페이지</BackBtn>
    </Wrapper>
  );
}
