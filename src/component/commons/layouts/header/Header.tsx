import React from "react";
import { Wrapper } from "./header.styles";
import { useHeader } from "../../../../hook/logic/layouts/useHeader";
interface IProps {
  type: "home" | "upload" | "search" | "profile" | "tasteMap";
  onSubmit?: () => void;
  btnText?: string;
  disabled?: boolean;
}
export default function Header({ type, btnText, disabled }: IProps) {
  const { getHeader } = useHeader({
    type,
    btnText,
    disabled
  });
  return (
    <>
      <Wrapper>{getHeader()}</Wrapper>
      <div style={{ paddingTop: "54px" }}></div>
    </>
  );
}
