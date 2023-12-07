import styled from 'styled-components';

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