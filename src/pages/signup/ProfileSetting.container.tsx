import React, { useEffect, useRef, useState } from "react";
import { useValidationInput } from "../../hook/useValidationInput";
import ProfileSettingUI from "./ProfileSetting.presenter";
import { resolveWebp } from "../../library/webpSupport";
import { getCompressionImg } from "../../library/imageCompression";
import { sweetToast } from "../../library/sweetAlert/sweetAlert";
import { useDispatch } from "react-redux";
import { fetchSignup } from "../../slice/signupSlice";
import { AppDispatch } from '../../store/store';

interface IProps {
  emailValue: string,
  passwordValue: string,
  phoneValue: string,
  setProfile: React.Dispatch<React.SetStateAction<boolean>>,
  setPercentage: React.Dispatch<React.SetStateAction<string>>,
  setNext: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function ProfileSetting({
  emailValue,
  passwordValue,
  phoneValue,
  setProfile,
  setPercentage,
  setNext,
}: IProps) {
  const dispatch = useDispatch<AppDispatch>();

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
  const imgValidation = (file: File) => {
    // 파일 확인
    if (!file) {
      return false;
    }
    // 파일 사이즈 확인
    if (file.size > 1024 * 1024 * 10) {
      sweetToast("이미지 파일의 크기를 초과하였습니다.(최대 10MB)", "warning");
      return false;
    }
    // 이미지 지원 형식 확인
    if (
      !file.name.includes("png") &&
      !file.name.includes("jpg") &&
      !file.name.includes("jpeg") &&
      !file.name.includes("bmp") &&
      !file.name.includes("tif") &&
      !file.name.includes("heic")
    ) {
      sweetToast(
        "이미지 형식을 확인해 주세요!\n(지원형식 : .jpg, .png, .jpeg,.bmp, .tif, *.heic)",
        "warning"
      );
      return false;
    }
    // 모두 만족 한다면 true 반환
    return true;
  };

  const onChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return;
    const file = e.target.files[0];
    const isValid = imgValidation(file);
    if (!isValid) return;
    const { compressedFile, preview } = await getCompressionImg(file) as { compressedFile: File; preview: string; };
    setPreviewImg(preview);
    setUploadImg(compressedFile);
  };

  const onClickImgReset = () => {
    setPreviewImg(resolveWebp("/assets/webp/icon-defaultProfile.webp", "svg"));
    setUploadImg("");
  };

  const onChangeIntroduce = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIntroduce(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      fetchSignup({
        displayNameValue,
        uploadImg,
        emailValue,
        passwordValue,
        phoneValue: phoneValue.replace(/-/g, ""),
        introduce,
      })
    );
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
    />
  );
}
