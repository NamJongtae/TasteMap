import { useEffect } from "react";
import { IMyProfileData } from "../../../../api/apiType";
import { useValidationInput } from "../../../useValidationInput";

interface IProps {
  myProfile: IMyProfileData;
  controllDisplayNameValidHandler: (displayNameValid: boolean)=>void;
}

export const useProfileUpdateDisplayName = ({ myProfile, controllDisplayNameValidHandler }: IProps) => {
  const [
    displayNameValue,
    displayNameValid,
    onChangeDisplayName,
    ,
    setDisplayNameValid
  ] = useValidationInput(myProfile.displayName || "", "displayName", true);

  useEffect(() => {
    // displayName 초기 valid true 설정
    setDisplayNameValid({ errorMsg: "", valid: true });
  }, []);

  // 버튼 disabled 제어하기 위해 displayName 유효성에 따라 값 적용
  useEffect(() => {
    controllDisplayNameValidHandler(displayNameValid.valid);
  }, [displayNameValid]);

  return {
    displayNameValue,
    displayNameValid,
    onChangeDisplayName,
    setDisplayNameValid
  };
};
