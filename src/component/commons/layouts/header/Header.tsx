import React from "react";
import { Wrapper } from "./header.styles";
import { useHeader } from "../../../../hook/logic/layouts/useHeader";
interface IProps {
  type: string;
  onSubmit?: () => void;
  btnText?: string;
  disabled?: boolean;
}
export default function Header({ type, onSubmit, btnText, disabled }: IProps) {
  const { getHeader } = useHeader({ type, onSubmit, btnText, disabled });
  return (
    <>
      <Wrapper>{getHeader()}</Wrapper>
      <div style={{ paddingTop: "54px" }}></div>
    </>
  );
}
