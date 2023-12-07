import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  padding: 30px 20px;
  background: none;
  width: calc(100% - 60px);
  max-width: 400px;
  gap: 20px;
  @media screen and (max-width: 431px) {
    width: calc(100% - 40px);
    padding: 30px 20px;
  }
`;