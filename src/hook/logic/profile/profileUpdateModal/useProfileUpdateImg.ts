import { useCallback, useState } from "react";
import { imgValidation } from "../../../../library/imageValidation";
import { isMobile } from "react-device-detect";
import { getCompressionImg } from "../../../../library/imageCompression";

interface IProps {
  initalPreviewImg: string;
}
export const useProfileUpdateImg = ({
  initalPreviewImg,
}: IProps) => {
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


  return {
    previewImg,
    setPreviewImg,
    uploadImg,
    setUploadImg,
    isImgLoading,
    changeImgHandler,
    imgResetHandler
  };
};
