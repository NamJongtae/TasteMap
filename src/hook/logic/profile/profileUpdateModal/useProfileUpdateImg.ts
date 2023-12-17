import { useCallback, useState } from "react";
import { imgValidation } from "../../../../library/imageValidation";
import { isMobile } from "react-device-detect";
import { getCompressionImg } from "../../../../library/imageCompression";
import { useFormContext } from "react-hook-form";
interface IProps {
  initalPreviewImg: string;
}
export const useProfileUpdateImg = ({ initalPreviewImg }: IProps) => {
  const [previewImg, setPreviewImg] = useState(initalPreviewImg);
  const [isImgLoading, setIsImgLoading] = useState(false);

  const { setValue } = useFormContext();

  const resetImgFileHandler = () => {
    setValue("img", process.env.REACT_APP_DEFAULT_PROFILE_IMG, {
      shouldDirty: true
    });
  };

  const handleUploadImgFile = (file: File) => {
    setValue("img", file, { shouldDirty: true });
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
    setPreviewImg(process.env.REACT_APP_DEFAULT_PROFILE_IMG || "");
  };

  const resetImgHandler = () => {
    resetPreviewHandler();
    resetImgFileHandler();
  };

  return {
    previewImg,
    setPreviewImg,
    isImgLoading,
    changeImgHandler,
    resetImgHandler
  };
};
