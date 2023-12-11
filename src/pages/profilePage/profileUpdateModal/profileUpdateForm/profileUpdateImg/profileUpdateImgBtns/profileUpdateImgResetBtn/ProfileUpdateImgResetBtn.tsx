import React from "react";
import { ResetBtn } from "../../../../ProfileUpdateModal.styles";
import { optModalTabFocus } from "../../../../../../../library/optModalTabFocus";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../store/store";

interface IProps {
  imgResetHandler: () => void;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
}
export default function ProfileUpdateImgResetBtn({
  imgResetHandler,
  closeBtnRef
}: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );

  return (
    <ResetBtn
      type='button'
      onClick={imgResetHandler}
      onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
        optModalTabFocus(e, closeBtnRef.current);
      }}
      aria-label='초기화'
      $isWebpSupported={isWebpSupported}
    />
  );
}
