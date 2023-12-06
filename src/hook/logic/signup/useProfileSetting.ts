import { useCallback, useEffect, useRef, useState } from "react";
import { useValidationInput } from "../../useValidationInput";
import { imgValidation } from "../../../library/imageValidation";
import { isMobile } from "react-device-detect";
import { getCompressionImg } from "../../../library/imageCompression";
import { UseMutateFunction } from "@tanstack/react-query";
import { resolveWebp } from '../../../library/resolveWebp';

interface IProps {
  emailValue: string;
  passwordValue: string;
  phoneValue: string;
  next: boolean;
  setPercentage: React.Dispatch<React.SetStateAction<string>>;
  signupMutate: UseMutateFunction<
    {
      uid: string;
      email: string | null;
      displayName: string | null;
      photoURL: string | undefined;
    },
    Error,
    {
      displayName: string;
      file: "" | File;
      email: string;
      password: string;
      phone: string;
      introduce: string;
    },
    unknown
  >;
}

export const useProfileSetting = ({
  emailValue,
  passwordValue,
  phoneValue,
  next,
  setPercentage,
  signupMutate
}: IProps) => {
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [completedProfile, setCompletedProfile] = useState(false);
  // 회원가입 버튼 활성화 상태 관리
  const [signupDisabled, setSignupDisabled] = useState(true);
  const [previewImg, setPreviewImg] = useState(
    resolveWebp("/assets/webp/icon-defaultProfile.webp", "svg")
  );
  const [uploadImg, setUploadImg] = useState<File | "">("");
  const [displayNameValue, displayNameValid, onChangeDislayName] =
    useValidationInput("", "displayName", true);
  const [introduce, setIntroduce] = useState("");
  const [isImgLoading, setIsImgLoading] = useState(false);

  const changeImgHandler = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const file = e.target.files[0];
      const isValid = imgValidation(file);
      if (!isValid) return;
      if (isMobile) {
        setIsImgLoading(true);
      }

      const { compressedFile, compressedPreview } = (await getCompressionImg(
        file,
        "profile"
      )) as {
        compressedFile: File;
        compressedPreview: string;
      };
      setPreviewImg(compressedPreview);
      setUploadImg(compressedFile);
      if (isMobile) {
        setIsImgLoading(false);
      }
    },
    [isMobile]
  );

  const imgResetHandler = () => {
    setPreviewImg(resolveWebp("/assets/webp/icon-defaultProfile.webp", "svg"));
    setUploadImg("");
  };

  const onChangeIntroduce = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === " " && e.target.value.length === 1) return;
    setIntroduce(e.target.value);
  };

  const signupHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupMutate({
      displayName: displayNameValue.toLowerCase(),
      file: uploadImg,
      email: emailValue,
      password: passwordValue,
      phone: phoneValue.replace(/-/g, ""),
      introduce
    });
  };

  useEffect(() => {
    if (displayNameValid.valid && next) {
      setSignupDisabled(false);
      setCompletedProfile(true);
      setPercentage("100%");
    } else if (!displayNameValid.valid && next) {
      setSignupDisabled(true);
      setPercentage("50%");
      setCompletedProfile(false);
    }
  }, [displayNameValid]);

  return {
    completedProfile,
    setCompletedProfile,
    signupHandler,
    imgInputRef,
    changeImgHandler,
    previewImg,
    imgResetHandler,
    displayNameValue,
    onChangeDislayName,
    introduce,
    onChangeIntroduce,
    displayNameValid,
    signupDisabled,
    isImgLoading
  };
};
