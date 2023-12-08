import styled from 'styled-components';

export const ContentSection = styled.section`
  margin-bottom: 20px;
`;

export const ContentTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  display: block;
  margin-bottom: 15px;
`;

export const ContentTextArea = styled.textarea`
  width: calc(100% - 30px);
  display: block;
  margin: 20px auto;
  background-color: #f9f9f9;
  resize: none;
  border: none;
  font-size: 14px;
  box-sizing: content-box;
  border-bottom: 1px solid #bdbdbd;
  line-height: 1.6;
  padding: 15px;
  :focus {
    outline: none;
  }
  overflow: hidden;
`;