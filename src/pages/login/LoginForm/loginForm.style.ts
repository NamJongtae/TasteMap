import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 20px;
  max-width: 400px;
  width: calc(100% - 60px);
  padding: 100px 40px 0 40px;
  @media screen and (max-width: 431px) {
    width: calc(100% - 40px);
    padding: 30px 20px;
  }
`;

export const LoginBtn = styled.button`
  width: 100%;
  background-color: ${(props) => (props.disabled ? "#cbcbcb" : "gold")};
  padding: 14px 0;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 500;
  margin-top: 10px;
  transition: all 0.5s;
`;
