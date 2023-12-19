import React from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  isReply: boolean;
  resetBtnRef: React.RefObject<HTMLButtonElement>;
}
export default function ResetBtn({ isReply, resetBtnRef }: IProps) {
  const { setValue } = useFormContext();
  return (
    <button
      type='button'
      className='a11y-hidden'
      onClick={() =>
        setValue(isReply ? "reply" : "comment", "", { shouldDirty: true })
      }
      ref={resetBtnRef}
    >
      리셋
    </button>
  );
}
