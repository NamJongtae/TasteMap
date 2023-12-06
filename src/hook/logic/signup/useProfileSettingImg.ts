import { useCallback, useRef, useState } from "react";
import { imgValidation } from "../../../library/imageValidation";
import { getCompressionImg } from "../../../library/imageCompression";
import { isMobile } from "react-device-detect";
import { resolveWebp } from '../../../library/resolveWebp';

export const useProfileSettingImg = () => {
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [previewImg, setPreviewImg] = useState(
    resolveWebp("/assets/webp/icon-defaultProfile.webp", "svg")
  );
  const [uploadImg, setUploadImg] = useState<File | "">("");
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

  return {
    imgInputRef,
    previewImg,
    uploadImg,
    isImgLoading,
    changeImgHandler,
    imgResetHandler
  };
};
