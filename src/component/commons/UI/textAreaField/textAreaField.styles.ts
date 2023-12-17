import styled from 'styled-components';

export const Wrapper = styled.div`
  & > p {
    margin-top: 10px;
  }
`;

export const Label = styled.label`
  display: block;
  margin: 0 0 5px 5px;
  font-size: 14px;
`;

export const TextArea = styled.textarea`
  width: calc(100% - 10px);
  resize: none;
  padding: 15px 5px;
  border: none;
  box-sizing: content-box;
  border-bottom: 1px solid #bdbdbd;
  line-height: 1.6;
  max-height: 100px;
  background: #f5f5f5;
  ::placeholder {
    font-weight: 500;
    color: #d0d0d0;
  }
  :focus {
    outline: none;
  }
  ::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }
  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #79a7ff; /* 스크롤바의 색상 */
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(33, 100, 244, 0.1); /*스크롤바 뒷 배경 색상*/
    border-radius: 10px;
  }
`;