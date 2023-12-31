import styled from "styled-components";

export const ShareTasteMapTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 10px;
  @media screen and (max-width:468px){
    justify-content: left;
    margin-left: 20px;
  }
`;

export const ShareTasteMapTitleImg = styled.img`
  margin-right: 5px;
  width: 25px;
`;

export const InvaildMap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const InvaildMapImg = styled.img``;

export const InvaildMapText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #bdbdbd;
`;
