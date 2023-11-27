import React, { useCallback, useEffect, useRef, useState } from "react";
import { useValidationInput } from "../../hook/useValidationInput";
import ProfileSettingUI from "./ProfileSetting.presenter";
import { resolveWebp } from "../../library/webpSupport";
import { getCompressionImg } from "../../library/imageCompression";
import { imgValidation } from "../../library/imageValidation";
import { isMobile } from "react-device-detect";
import { UseMutateFunction } from '@tanstack/react-query';
interface IProps {
  emailValue: string;
  passwordValue: string;
  phoneValue: string;
  setProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setPercentage: React.Dispatch<React.SetStateAction<string>>;
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: UseMutateFunction<
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

export default function ProfileSetting({
  emailValue,
  passwordValue,
  phoneValue,
  setProfile,
  setPercentage,
  setNext,
  mutate,
}: IProps) {

  const imgInputRef = useRef<HTMLInputElement>(null);
  // 회원가입 버튼 활성화 상태 관리
  const [disabled, setDisabled] = useState(true);
  const [previewImg, setPreviewImg] = useState(
    resolveWebp("/assets/webp/icon-defaultProfile.webp", "svg")
  );
  const [uploadImg, setUploadImg] = useState<File | "">("");
  const [displayNameValue, displayNameValid, onChangeDislayName] =
    useValidationInput("", "displayName", true);
  const [introduce, setIntroduce] = useState("");
  const [isImgLoading, setIsImgLoading] = useState(false);

  const onChangeImg = useCallback(
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

  const onClickImgReset = () => {
    setPreviewImg(resolveWebp("/assets/webp/icon-defaultProfile.webp", "svg"));
    setUploadImg("");
  };

  const onChangeIntroduce = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === " " && e.target.value.length === 1) return;
    setIntroduce(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      displayName: displayNameValue.toLowerCase(),
      file: uploadImg,
      email: emailValue,
      password: passwordValue,
      phone: phoneValue.replace(/-/g, ""),
      introduce
    });
  };

  useEffect(() => {
    if (displayNameValid.valid) {
      setDisabled(false);
      setProfile(true);
      setPercentage("100%");
    } else {
      setDisabled(true);
      setPercentage("50%");
      setProfile(false);
    }
  }, [displayNameValid]);

  return (
    <ProfileSettingUI
      handleSubmit={handleSubmit}
      imgInputRef={imgInputRef}
      onChangeImg={onChangeImg}
      previewImg={previewImg}
      onClickImgReset={onClickImgReset}
      displayNameValue={displayNameValue}
      onChangeDislayName={onChangeDislayName}
      introduce={introduce}
      onChangeIntroduce={onChangeIntroduce}
      displayNameValid={displayNameValid}
      disabled={disabled}
      setProfile={setProfile}
      setPercentage={setPercentage}
      setNext={setNext}
      resolveWebp={resolveWebp}
      isImgLoading={isImgLoading}
    />
  );
}
