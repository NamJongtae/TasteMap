import React from "react";
import { FormMenuBtn, FormMenuItemWrapper } from "../../findAccount.styles";

interface IProps {
  activeMenu: "email" | "password";
  menu: "email" | "password";
  activeMenuHandler: () => void;
  menuText: string;
}
export default function FormMenuItem({
  activeMenu,
  menu,
  activeMenuHandler,
  menuText
}: IProps) {
  return (
    <FormMenuItemWrapper active={activeMenu === menu}>
      <FormMenuBtn
        active={activeMenu === menu}
        type='button'
        onClick={activeMenuHandler}
      >
        {menuText}
      </FormMenuBtn>
    </FormMenuItemWrapper>
  );
}
