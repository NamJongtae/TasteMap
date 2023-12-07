import styled from 'styled-components';

export const ProfileImgDescList = styled.ul`
  padding: 20px 10px;
  display: table;
  margin: 0 auto;
`;

export const ProfileImgDescItem = styled.li`
  color: #4c4d4f;
  line-height: 1.5;
  font-size: 12px;
  word-break: keep-all;
  @media screen and (max-width: 362px) {
    font-size: 11px;
  }
`;