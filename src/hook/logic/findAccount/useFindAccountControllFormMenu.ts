import { useState } from "react";
import { TFindAccountMenu } from "../../../types/types";

export const useFindAccountControllFormMenu = () => {
  const [activeMenu, setActiveMenu] = useState<TFindAccountMenu>("EMAIL");

  const activeFindEmailMenuHandler = () => {
    setActiveMenu("EMAIL");
  };

  const activeFindPasswordMenuHandler = () => {
    setActiveMenu("PASSWORD");
  };

  return {
    activeMenu,
    activeFindEmailMenuHandler,
    activeFindPasswordMenuHandler
  };
};
