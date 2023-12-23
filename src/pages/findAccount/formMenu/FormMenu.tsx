import React from "react";
import { FormMenuList } from "../findAccount.styles";
import FormMenuItem from "./FormMenuItem/FormMenuItem";

interface IProps {
  activeMenu: "email" | "password";
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
        menu='email'
        activeMenuHandler={activeFindEmailMenuHandler}
        menuText='이메일 찾기'
      />
      <FormMenuItem
        activeMenu={activeMenu}
        menu='password'
        activeMenuHandler={activeFindPasswordMenuHandler}
        menuText='비밀번호 찾기'
      />
    </FormMenuList>
  );
}
