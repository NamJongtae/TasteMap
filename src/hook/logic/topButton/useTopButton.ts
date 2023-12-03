import { useEffect, useRef, useState } from "react";

export const useTopButton = () => {
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

  return { isActive, scrollToTop, buttonRef };
};
