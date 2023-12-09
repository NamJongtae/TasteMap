import { useSupportedWebp } from "../../../../hook/useSupportedWebp";
import { SocialLoginBtn, SocialLoginItem, SocialLoginWrapper } from '../../login.styles';

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
          <SocialLoginItem key={text + i}>
            <SocialLoginBtn
              className={buttonTypeArr[i]}
              type='button'
              onClick={onClickArr[i]}
              $isWebpSupported={isWebpSupported}
            >
              {text}
            </SocialLoginBtn>
          </SocialLoginItem>
        );
      })}
    </SocialLoginWrapper>
  );
};
