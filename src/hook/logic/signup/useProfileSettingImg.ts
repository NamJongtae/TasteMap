import { useCallback, useRef, useState } from "react";
import { imgValidation } from "../../../library/imageValidation";
import { getCompressionImg } from "../../../library/imageCompression";
import { isMobile } from "react-device-detect";
import { resolveWebp } from "../../../library/resolveWebp";
import { useFormContext } from "react-hook-form";

export const useProfileSettingImg = () => {
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImg, setPreviewImg] = useState(
    resolveWebp("/assets/webp/icon-defaultProfile.webp", "svg")
  );
  const [isImgLoading, setIsImgLoading] = useState(false);

  const { setValue } = useFormContext();

  const handleUploadImgFile = (file: File) => {
    setValue("img", file);
  };

  const resetImgFileHandler = () => {
    setValue("img", process.env.REACT_APP_DEFAULT_PROFILE_IMG);
  };

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
      handleUploadImgFile(compressedFile);
      if (isMobile) {
        setIsImgLoading(false);
      }
    },
    [isMobile]
  );

  const resetPreviewHandler = () => {
    setPreviewImg(resolveWebp("/assets/webp/icon-defaultProfile.webp", "svg"));
  };

  const resetImgHandler = () => {
    resetPreviewHandler();
    resetImgFileHandler();
  };

  return {
    imgInputRef,
    previewImg,
    isImgLoading,
    changeImgHandler,
    resetImgHandler
  };
};
