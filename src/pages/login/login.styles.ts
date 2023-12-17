import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import styled from "styled-components";

// ----------------Login style----------------

export const Title = styled.h1``;

export const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  height: 100vh;
  overflow: auto;
`;

// ----------------LoginForm style----------------

export const FormContentWrapper = styled.div`
  display: flex;
  margin: 0 auto;
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

export const StyledLoginBtn = styled.button`
  width: 100%;
  background-color: ${(props) => (props.disabled ? "#cbcbcb" : "gold")};
  padding: 14px 0;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 500;
  margin-top: 10px;
  transition: all 0.5s;
`;

// ----------------LoginFormTitle style----------------

export const FormTitle = styled.h2`
  text-align: center;
  font-weight: 500;
`;

// ----------------FindAccountLink style----------------

export const StyledFindAccountLink = styled(Link)`
  font-size: 12px;
  align-self: flex-end;
`;

export const Line = styled.span`
  font-size: "10px";
  vertical-align: "top";
`;

// ----------------SignupLink style----------------

export const SignupLinkWrapper = styled.div`
  display: inline-block;
  font-size: 12px;
  color: #111;
  text-align: center;
`;

export const StyledSignupLink = styled(Link)`
  font-size: 12px;
  margin-left: 5px;
  font-weight: 500;
`;

// ----------------SocialLogin style----------------

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

// ----------------SocialLoginBtn style----------------

export const SocialLoginBtnWrapper = styled.li`
  margin-bottom: 20px;
  text-align: center;
`;

export const StyledSocialLoginBtn = styled.button`
  width: 100%;
  max-width: 300px;
  border-radius: 5px;
  font-weight: 400;
  padding: 15px 0;
  border: px solid #bdbdbd;
  transition: all 0.2s;
  &.google {
    background: ${(props: { $isWebpSupported: boolean | null }) =>
      `url(${
        props.$isWebpSupported
          ? "/assets/webp/icon-google.webp"
          : "/assets/icon-google.svg"
      }) no-repeat center left 15px / 24px #fff`};
  }
  &.github {
    background: ${(props: { $isWebpSupported: boolean | null }) =>
      `url(${
        props.$isWebpSupported
          ? "/assets/webp/icon-github.webp"
          : "/assets/icon-github.svg"
      }) no-repeat center left 15px / 24px #fff`};
  }
  &:hover {
    background-color: ${isMobile ? "" : "#ddd"};
  }
`;
