import React from "react";
import { Button } from "./topButton.styles";
import { useTopButton } from "../../../hook/logic/topButton/useTopButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export default function TopButton() {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );
  const { isActive, scrollToTop, buttonRef } = useTopButton();
  return (
    <>
      {isActive && (
        <Button
          type='button'
          onClick={scrollToTop}
          ref={buttonRef}
          $isWebpSupported={isWebpSupported}
        >
          TOP
        </Button>
      )}
    </>
  );
}
