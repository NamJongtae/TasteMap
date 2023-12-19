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
  border-bottom: 1px solid #bdbdbd;
  line-height: 1.6;
  background: #f5f5f5;
  ::placeholder {
    font-weight: 500;
    color: #d0d0d0;
  }
  :focus {
    outline: none;
  }
  overflow: hidden;
`;