import React from "react";
import { FormMenuBtn, FormMenuItemWrapper } from "../../findAccount.styles";
import { TFindAccountMenu } from "../../../../types/types";

interface IProps {
  activeMenu: TFindAccountMenu;
  menu: TFindAccountMenu;
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
