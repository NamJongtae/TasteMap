import { useCallback, useEffect, useRef, useState } from "react";
import { imgValidation } from "../../../../library/imageValidation";
import { isMobile } from "react-device-detect";
import { getCompressionImg } from "../../../../library/imageCompression";

export const useProfileUpdateImg = (
  initalPreviewImg: string,
  resetBtnRef: React.RefObject<HTMLButtonElement>
) => {
  const imgInputRef = useRef<HTMLInputElement>(null);
  const ProfileImgButtonWrapperRef = useRef<HTMLDivElement>(null);
  const [uploadImg, setUploadImg] = useState<File | string>("");
  const [previewImg, setPreviewImg] = useState(initalPreviewImg);
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
    setPreviewImg(process.env.REACT_APP_DEFAULT_PROFILE_IMG || "");
    setUploadImg("defaultImg");
  };

  useEffect(() => {
    if (ProfileImgButtonWrapperRef.current) {
      ProfileImgButtonWrapperRef.current.focus();
    }
  }, []);

  return {
    imgInputRef,
    ProfileImgButtonWrapperRef,
    resetBtnRef,
    previewImg,
    setPreviewImg,
    uploadImg,
    setUploadImg,
    isImgLoading,
    changeImgHandler,
    imgResetHandler
  };
};
