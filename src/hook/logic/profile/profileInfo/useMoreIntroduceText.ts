import { useLayoutEffect, useRef, useState } from "react";
import { IMyProfileData, IUserProfileData } from "../../../../types/apiTypes";

interface IProps {
  profile: IMyProfileData | IUserProfileData;
}
export const useMoreIntroduceText = ({ profile }: IProps) => {
  const [isShowMoreTextBtn, setIsShowMoreTextBtn] = useState(false);
  const introduceRef = useRef<HTMLParagraphElement>(null);

  const openMoreIntroduceTextHandler = () => {
    if (introduceRef.current) {
      introduceRef.current.style.display = "block";
      setIsShowMoreTextBtn(false);
    }
  };

  useLayoutEffect(() => {
    if (introduceRef.current) {
      if (introduceRef.current?.clientHeight >= 63) {
        setIsShowMoreTextBtn(true);
      } else {
        setIsShowMoreTextBtn(false);
      }
    }
  }, [profile]);

  return { isShowMoreTextBtn, introduceRef, openMoreIntroduceTextHandler };
};
