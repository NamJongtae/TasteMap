import styled from 'styled-components';

export const Wrapper = styled.main`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  background-color: #f5f5f5;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  max-width: 450px;
  padding: 0px 40px;
  @media screen and (max-width: 431px) {
    padding: 0px 30px;
  }
  background-color: #f5f5f5;
`;

export const Title = styled.h1`
  margin-top: 20px;
  font-size: 25px;
  margin-bottom: 20px;
  font-weight: 500;
`;