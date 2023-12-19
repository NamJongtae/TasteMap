import { useRef } from "react";

export const useResetTextAreaForm = () => {
  // 하위 input 초기화를 위해 buttonRef 생성
  const resetBtnRef = useRef<HTMLButtonElement>(null);

  // reset를 위해 buttonRef.click() 사용
  const resetFormHandler = () => {
    resetBtnRef.current?.click();
  };

  return { resetBtnRef, resetFormHandler };
};
