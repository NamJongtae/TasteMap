import { useSupportedWebp } from "../../../hook/useSupportedWebp";
import { SocialLoginBtnWrapper, SocialLoginWrapper, StyledSocialLoginBtn } from '../login.styles';

interface IPrpos {
  buttonTypeArr: string[];
  textArr: string[];
  onClickArr: React.MouseEventHandler<HTMLButtonElement>[];
}

export const SocialLoginBtns = ({
  buttonTypeArr,
  textArr,
  onClickArr
}: IPrpos) => {
  const { isWebpSupported } = useSupportedWebp();
  return (
    <SocialLoginWrapper>
      {textArr.map((text: string, i: number) => {
        return (
          <SocialLoginBtnWrapper key={text + i}>
            <StyledSocialLoginBtn
              className={buttonTypeArr[i]}
              type='button'
              onClick={onClickArr[i]}
              $isWebpSupported={isWebpSupported}
            >
              {text}
            </StyledSocialLoginBtn>
          </SocialLoginBtnWrapper>
        );
      })}
    </SocialLoginWrapper>
  );
};
