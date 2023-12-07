import React from "react";
import { FormMenuBtn, FormMenuLi, FormMenuList } from './formMenu.styles';

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
      <FormMenuLi active={activeMenu === "email"}>
        <FormMenuBtn
          active={activeMenu === "email"}
          type='button'
          onClick={activeFindEmailMenuHandler}
        >
          이메일 찾기
        </FormMenuBtn>
      </FormMenuLi>
      <FormMenuLi active={activeMenu === "password"}>
        <FormMenuBtn
          active={activeMenu === "password"}
          type='button'
          onClick={activeFindPasswordMenuHandler}
        >
          비밀번호 찾기
        </FormMenuBtn>
      </FormMenuLi>
    </FormMenuList>
  );
}
