import { useState } from "react";

export const useFindAccountFormMenuController = () => {
  const [activeMenu, setActiveMenu] = useState<"email" | "password">("email");

  const activeFindEmailMenuHandler = () => {
    setActiveMenu("email");
  };

  const activeFindPasswordMenuHandler = () => {
    setActiveMenu("password");
  };

  return {
    activeMenu,
    activeFindEmailMenuHandler,
    activeFindPasswordMenuHandler
  };
};
