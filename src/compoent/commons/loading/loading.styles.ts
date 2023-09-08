import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 999;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 30px;
  font-weight: bold;
`;

export const Title = styled.h2``;

export const LoadingImg = styled.img``;

export const LoadingText = styled.p`
  font-size: 25px;
  color: black;
`;
