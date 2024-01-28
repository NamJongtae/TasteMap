import React from "react";
import {
  SocialLoginBtnWrapper,
  StyledSocialLoginBtn
} from "../../../../login.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import { TLogin } from "../../../../../../types/types";

interface IProps {
  socialLoginHandler: (type: TLogin) => void;
  btnText: string;
  loginType: TLogin;
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
