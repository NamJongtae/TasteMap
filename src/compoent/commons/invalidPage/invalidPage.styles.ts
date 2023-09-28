import styled from "styled-components";

export const Wrapper = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InvalidImg = styled.img`
  width: 120px;
  height: 120px;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: #bdbdbd;
`;

export const BackBtn = styled.button`
  background-color: gold;
  padding: 5px 20px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
`;
