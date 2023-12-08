import { UseMutateFunction } from "@tanstack/react-query";
import { useTextarea } from "../../../useTextarea";
import { IMyProfileData, IProfileUpdateData } from "../../../../api/apiType";
import { useProfileUpdateImg } from "./useProfileUpdateImg";
import { useValidationInput } from "../../../useValidationInput";
import { useEffect, useRef } from "react";
interface IProps {
  updateProfileMutate: UseMutateFunction<
    | {
        uid: string;
        email: string | null;
        displayName: any;
        introduce: any;
        photoURL: any;
      }
    | undefined,
    Error,
    IProfileUpdateData,
    unknown
  >;
  myProfile: IMyProfileData;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  resetBtnRef: React.RefObject<HTMLButtonElement>;
}
export const useProfileUpdateForm = ({
  updateProfileMutate,
  myProfile,
  textareaRef,
  resetBtnRef
}: IProps) => {
  const editBtnRef = useRef<HTMLButtonElement>(null);
  const {
    value: introduceValue,
    onChangeValue: onChangeIntroduce,
    resizeTextAreaHeight,
    preventKeydownEnter
  } = useTextarea(myProfile.introduce, textareaRef, 30);

  const {
    imgInputRef,
    ProfileImgButtonWrapperRef,
    previewImg,
    setPreviewImg,
    uploadImg,
    setUploadImg,
    isImgLoading,
    changeImgHandler,
    imgResetHandler
  } = useProfileUpdateImg(myProfile.photoURL, resetBtnRef);

  const [
    displayNameValue,
    displayNameValid,
    onChangeDisplayName,
    ,
    setDisplayNameValid
  ] = useValidationInput(myProfile.displayName || "", "displayName", true);

  /**
   * 프로필 수정
   */
  const updateProfileHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const IProfileUpdateData = {
      displayName: displayNameValue.toLowerCase(),
      file: uploadImg,
      introduce: introduceValue
    };
    updateProfileMutate(IProfileUpdateData);
  };

  useEffect(() => {
    // 초기 textarea 높이 설정
    resizeTextAreaHeight();
    // displayName 초기 valid true 설정
    setDisplayNameValid({ errorMsg: "", valid: true });
  }, []);

  return {
    textareaRef,
    editBtnRef,
    resetBtnRef,
    imgInputRef,
    ProfileImgButtonWrapperRef,
    uploadImg,
    setUploadImg,
    previewImg,
    setPreviewImg,
    isImgLoading,
    changeImgHandler,
    imgResetHandler,
    displayNameValue,
    displayNameValid,
    setDisplayNameValid,
    onChangeDisplayName,
    introduceValue,
    onChangeIntroduce,
    updateProfileHandler,
    resizeTextAreaHeight,
    preventKeydownEnter
  };
};
