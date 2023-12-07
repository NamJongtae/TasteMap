import { useCallback, useEffect, useRef, useState } from "react";

export const usePostMenu = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const closeMenu = useCallback(() => {
    if (menuRef.current) {
      menuRef.current.style.animation = "fadeOutOption 0.5s";
      setTimeout(() => {
        setIsOpenMenu(false);
      }, 300);
    }
  }, []);

  const openMenu = () => {
    setIsOpenMenu(true);
  };

  const toggleMenuHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (menuRef.current && isOpenMenu) {
        closeMenu();
      } else {
        openMenu();
      }
    },
    [isOpenMenu, closeMenu]
  );

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isOpenMenu && !menuRef.current?.contains(e.target as Node)) {
        closeMenu();
      }
    };

    if (isOpenMenu) {
      document.body.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpenMenu, closeMenu]);

  return { menuRef, toggleMenuHandler, isOpenMenu, closeMenu };
};
