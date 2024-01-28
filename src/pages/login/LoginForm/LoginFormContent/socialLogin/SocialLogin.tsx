import Loading from "../../../../../component/commons/loading/Loading";
import { useSocialLoginDataFetch } from "../../../../../hook/logic/login/useSocialLoginDataFetch";
import { SocialLoginWrapper } from "../../../login.styles";
import SocialLoginBtn from "./SocialLoginBtn/SocialLoginBtn";

export const SocialLogin = () => {
  const { socialLoginHandler, socialLoginIsPending } =
    useSocialLoginDataFetch();

  if (socialLoginIsPending) {
    return <Loading />;
  }

  return (
    <SocialLoginWrapper>
      <SocialLoginBtn
        loginType="GOOGLE"
        socialLoginHandler={socialLoginHandler}
        btnText='구글 계정으로 로그인'
      />

      <SocialLoginBtn
        loginType='GITHUB'
        socialLoginHandler={socialLoginHandler}
        btnText='깃 허브 계정으로 로그인'
      />
    </SocialLoginWrapper>
  );
};
