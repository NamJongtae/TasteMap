import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import {
  Introduce,
  IntroduceTextLine,
  MoreTextBtn
} from "../../profileInfo.styles";
import { useMoreIntroduceText } from "../../../../../../hook/logic/profile/profileInfo/useMoreIntroduceText";
import { TProfile } from "../../../../../../types/types";

interface IProps {
  profile: TProfile;
}

export const ProfileIntroduce = ({ profile }: IProps) => {
  const { introduceRef, isShowMoreTextBtn, openMoreIntroduceTextHandler } =
    useMoreIntroduceText({ profile });

  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );

  return (
    <>
      <Introduce ref={introduceRef} isShowMoreTextBtn={isShowMoreTextBtn}>
        {profile.introduce}
      </Introduce>
      {isShowMoreTextBtn && (
        <>
          <IntroduceTextLine></IntroduceTextLine>
          <MoreTextBtn
            onClick={openMoreIntroduceTextHandler}
            $isWebpSupported={isWebpSupported}
          >
            더보기
          </MoreTextBtn>
        </>
      )}
    </>
  );
};
