import React, { useEffect, useRef, useState } from "react";
import { Button } from "./topButton.styles";

export default function TopButton() {
  const [isActive, setIsActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const changeActive = () => {
      if (window.scrollY > 500) {
        setIsActive(true);
      } else {
        if (buttonRef.current) {
          buttonRef.current.style.animation = "topBtnFadeOut 0.5s";
          setTimeout(() => {
            setIsActive(false);
          }, 450);
        }
      }
    };
    window.addEventListener("scroll", changeActive);
    return () => window.removeEventListener("scroll", changeActive);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      {isActive && (
        <Button type='button' onClick={scrollToTop} ref={buttonRef}>TOP</Button>
      )}
    </>
  );
}
