import { useEffect } from "react";
import { isMobile } from "react-device-detect";

export const useSingupSetScreenSize = () => {
  function setScreenSize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  useEffect(() => {
    if (isMobile) setScreenSize();
  }, [isMobile]);
};
