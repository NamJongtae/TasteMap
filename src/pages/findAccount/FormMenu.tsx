import React from "react";
import styled from "styled-components";

export const FormMenuList = styled.ul`
  width: 100%;
  max-width: 400px;
  display: flex;
  height: 50px;
  background: none;
  @media screen and (max-width: 431px) {
    width: calc(100% - 40px);
  }
`;
export const FormMenuLi = styled.li`
  flex-basis: 50%;
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #b5b5b5;
  border-color: ${(props: { active: boolean }) =>
    props.active ? "#a16ee9" : "#b5b5b5"};
`;
export const FormMenuBtn = styled.button`
  width: 100%;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  border: none;
  background: none;
  color: ${(props: { active: boolean }) =>
    props.active ? "#a16ee9" : "#b5b5b5"};
  cursor: pointer;
  @media screen and (max-width: 431px) {
    font-size: 16px;
  }
`;

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
