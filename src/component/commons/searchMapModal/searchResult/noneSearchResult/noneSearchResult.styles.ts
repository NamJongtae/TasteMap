import styled from 'styled-components';

export const NoSearchData = styled.div`
  padding: 20px;
  line-height: 1.5;
  font-size: 14px;
`;

export const TipExample = styled.p`
  color: #5ea6f7;
  font-size: 14px;
`;

export const Strong = styled.strong`
  font-weight: 700;
`;
export const NoSearchDataText = styled.p`
  &:nth-child(1) {
    margin-bottom: 20px;
  }
  &:nth-child(2) {
    margin-bottom: 5px;
    font-weight: 500;
  }
  white-space: pre-line;
`;