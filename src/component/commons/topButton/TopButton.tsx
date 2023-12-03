import React from "react";
import { Button } from "./topButton.styles";
import { useSupportedWebp } from "../../../hook/useSupportedWebp";
import { useTopButton } from "../../../hook/logic/topButton/useTopButton";

export default function TopButton() {
  const { isWebpSupported, resolveWebp } = useSupportedWebp();
  const { isActive, scrollToTop, buttonRef } = useTopButton();
  return (
    <>
      {isActive && (
        <Button
          type='button'
          onClick={scrollToTop}
          ref={buttonRef}
          style={{ background: `url(${resolveWebp})` }}
          $isWebpSupported={isWebpSupported}
        >
          TOP
        </Button>
      )}
    </>
  );
}
