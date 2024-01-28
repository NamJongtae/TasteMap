import React from "react";
import { FormMenuList } from "../findAccount.styles";
import FormMenuItem from "./FormMenuItem/FormMenuItem";
import { TFindAccountMenu } from "../../../types/types";

interface IProps {
  activeMenu: TFindAccountMenu;
  activeFindEmailMenuHandler: () => void;
  activeFindPasswordMenuHandler: () => void;
}

export default function FormMenu({
  activeMenu,
  activeFindEmailMenuHandler,
  activeFindPasswordMenuHandler
}: IProps) {
  return (
    <FormMenuList>
      <FormMenuItem
        activeMenu={activeMenu}
        menu="EMAIL"
        activeMenuHandler={activeFindEmailMenuHandler}
        menuText='이메일 찾기'
      />
      <FormMenuItem
        activeMenu={activeMenu}
        menu="PASSWORD"
        activeMenuHandler={activeFindPasswordMenuHandler}
        menuText='비밀번호 찾기'
      />
    </FormMenuList>
  );
}
