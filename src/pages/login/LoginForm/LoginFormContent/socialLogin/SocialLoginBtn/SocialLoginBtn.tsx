import React from "react";
import {
  SocialLoginBtnWrapper,
  StyledSocialLoginBtn
} from "../../../../login.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";

interface IProps {
  socialLoginHandler: (type: "google" | "github") => void;
  btnText: string;
  loginType: "google" | "github";
}
export default function SocialLoginBtn({
  socialLoginHandler,
  btnText,
  loginType
}: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );

  return (
    <SocialLoginBtnWrapper>
      <StyledSocialLoginBtn
        className={loginType}
        type='button'
        onClick={() => socialLoginHandler(loginType)}
        $isWebpSupported={isWebpSupported}
      >
        {btnText}
      </StyledSocialLoginBtn>
    </SocialLoginBtnWrapper>
  );
}
