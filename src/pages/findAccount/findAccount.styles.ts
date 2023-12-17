import { Link } from "react-router-dom";
import styled from "styled-components";

// ----------------FindAccount style----------------

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow: auto;
  background-color: #f5f5f5;
`;

export const FormWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`;

export const Title = styled.h1``;

// ----------------FormMenu style----------------

export const FormMenuList = styled.ul`
  width: 100%;
  max-width: 400px;
  display: flex;
  height: 50px;
  background: none;
  @media screen and (max-width: 431px) {
    width: calc(100% - 40px);
  }
`;

export const FormMenuItemWrapper = styled.li`
  flex-basis: 50%;
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #b5b5b5;
  border-color: ${(props: { active: boolean }) =>
    props.active ? "#a16ee9" : "#b5b5b5"};
`;

export const FormMenuBtn = styled.button`
  width: 100%;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  border: none;
  background: none;
  color: ${(props: { active: boolean }) =>
    props.active ? "#a16ee9" : "#b5b5b5"};
  cursor: pointer;
  @media screen and (max-width: 431px) {
    font-size: 16px;
  }
`;

// ----------------FindAccountForm style----------------

export const FormContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  padding: 30px 20px;
  background: none;
  width: calc(100% - 60px);
  max-width: 400px;
  margin: 0 auto;
  gap: 20px;
  @media screen and (max-width: 431px) {
    width: calc(100% - 40px);
    padding: 30px 20px;
  }
`;

// ----------------FormButton style----------------

export const FindAccountBtn = styled.button`
  width: 100%;
  background-color: ${(props) => (props.disabled ? "#cbcbcb" : "#a16ee9")};
  cursor: ${(props) => (props.disabled ? "default" : "cursor")};
  padding: 14px 0;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 500;
  margin-top: 10px;
  transition: all 0.5s;
  color: #fff;
`;

export const LoginLink = styled(Link)`
  display: block;
  text-align: center;
  width: 100%;
  padding: 18px 0;
  border-radius: 4px;
  background-color: #a16ee9;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  margin-top: 10px;
`;

// ----------------FindValueContent style----------------

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
