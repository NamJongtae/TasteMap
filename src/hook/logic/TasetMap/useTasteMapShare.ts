import { useCallback } from "react";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { IMyProfileData, IUserProfileData } from "../../../api/apiType";

interface IProps {
  profile: IMyProfileData | IUserProfileData | undefined;
}
export const useTasteMapShare = ({ profile }: IProps) => {
  const shareTasteMapHanlder = useCallback(async () => {
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    const url =
      window.document.location.host + `/tasteMap/share/${profile?.uid}`;
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    sweetToast("맛집 지도 공유 링크가 복사되었습니다.", "success");
  }, []);

  return { shareTasteMapHanlder };
};
