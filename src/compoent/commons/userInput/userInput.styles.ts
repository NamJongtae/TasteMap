import styled from "styled-components";

export const Wrapper = styled.div``;
export const Label = styled.label`
  display: block;
  margin: 0 0 5px 5px;
  font-size: 14px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px 5px;
  border: none;
  border-bottom: 1px solid #bdbdbd;
  margin: 0 auto;
  background: #f5f5f5;
  ::placeholder{
    font-weight: 500;
    color: #d0d0d0;
  }
`;
