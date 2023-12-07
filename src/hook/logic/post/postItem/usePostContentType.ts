import { useState } from "react";
import { sweetToast } from "../../../../library/sweetAlert/sweetAlert";

export const usePostContentType = () => {
  const [contentType, setContentType] = useState<"MAP" | "IMAGE">("MAP");

  const changeMapTypeHandler = (imgURL: string[]) => {
    if (imgURL && imgURL.length === 0) {
      sweetToast("이미지가 존재하지 않습니다.", "warning");
      return;
    }
    setContentType("IMAGE");
  };

  const changeImgTypeHandler = () => {
    setContentType("MAP");
  };

  return { contentType, changeMapTypeHandler, changeImgTypeHandler };
};
