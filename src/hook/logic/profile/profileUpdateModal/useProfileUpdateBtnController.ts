import { useState, useCallback } from "react";
import { IMyProfileData } from "../../../../api/apiType";

interface IProps {
  myProfile: IMyProfileData;
}

export const useProfileUpdateBtnController = ({ myProfile }: IProps) => {
  const [controllDisplayName, setControllDisplayName] = useState(
    myProfile.displayName
  );
  const [controllDisplayNameValid, setControllDisplayNameValid] =
    useState(false);
  const [controllPreviewImg, setControllPreviewImg] = useState(
    myProfile.photoURL
  );
  const [controllIntroduce, setControllIntroduce] = useState(
    myProfile.introduce
  );

  const controllDisplayNameHandler = useCallback((displayName: string) => {
    setControllDisplayName(displayName);
  }, []);

  const controllDisplayNameValidHandler = useCallback(
    (displayNameValid: boolean) => {
      setControllDisplayNameValid(displayNameValid);
    },
    []
  );

  const controllPreviewImgHandler = useCallback((previewImg: string) => {
    setControllPreviewImg(previewImg);
  }, []);

  const controllIntroduceHandler = useCallback((introduce: string) => {
    setControllIntroduce(introduce);
  }, []);

  const isDisabledUpdateBtn =
    !controllDisplayNameValid ||
    (myProfile.displayName?.toLowerCase() ===
      controllDisplayName.toLowerCase() &&
      myProfile.photoURL === controllPreviewImg &&
      myProfile.introduce === controllIntroduce);

  return {
    controllDisplayNameHandler,
    controllDisplayNameValidHandler,
    controllPreviewImgHandler,
    controllIntroduceHandler,
    isDisabledUpdateBtn,
    controllPreviewImg
  };
};
