import styled from 'styled-components';
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

export const Title = styled.h1``;
export const Wrapper = styled.main`
  background-color: #f5f5f5;
  height: 100vh;
`;
export const LoginFormTitle = styled.h2`
  text-align: center;
  font-weight: 500;
`;
export const LoginForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  width: calc(100% - 60px);
  padding: 30px 40px;
  @media screen and (max-width: 431px) {
    width: calc(100% - 40px);
    padding: 30px 20px;
  }
`;
export const InputWrapper = styled.div`
  & > p {
    margin-top: 10px;
  }
`;
export const LoginBtn = styled.button`
  width: 100%;
  background-color: ${(props) =>
    props.disabled ? "#cbcbcb" : "gold"};
  padding: 14px 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  transition: all 0.5s;
`;

export const SignupText = styled.p`
  display: inline-block;
  font-size: 12px;
  color: #111;
  text-align: center;
`;

export const SignupLink = styled(Link)`
  font-size: 12px;
  margin-left: 5px;
  font-weight: 500;
`;

export const FindAccountLink = styled(Link)`
  font-size: 12px;
  align-self: flex-end;
`;

export const SocialLoginWrapper = styled.ul`
  position: relative;
  justify-content: center;
  border-top: 1px solid #111;
  padding-top: 30px;
  margin-top: 20px;
  ::after {
    content: "3초만에 시작하기";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    background-color: #f5f5f5;
    font-size: 13px;
    padding: 0 10px;
  }
`;

export const SocialLoginItem = styled.li`
  margin-bottom: 20px;
  text-align: center;
`;

export const SocialLoginBtn = styled.button`
  width: 100%;
  max-width: 300px;
  border-radius: 5px;
  font-weight: 400;
  padding: 15px 0;
  border: px solid #bdbdbd;
  transition: all 0.2s;
  body.webp &{
    &.google {
      background: url("/assets/webp/icon-google.webp") no-repeat center left 15px /
        24px #fff;
    }
    &.github {
      background: url("/assets/webp/icon-github.webp") no-repeat center left 15px /
        24px #fff;
    }
    &:hover {
    background-color: ${isMobile ? "" : "#ddd"};
  }
  }
  body.no-webp &{
    &.google {
      background: url("/assets/icon-google.svg") no-repeat center left 15px /
        24px #fff;
    }
    &.github {
      background: url("/assets/icon-github.svg") no-repeat center left 15px /
        24px #fff;
    }
    &:hover {
    background-color: ${isMobile ? "" : "#ddd"};
  }
  }

`;
