import { useCallback, useEffect, useState } from "react";

export const useTextarea = (
  initialValue: string,
  textareaRef: React.RefObject<HTMLTextAreaElement>,
  scrollHeightMargin: number
) => {
  const [value, setValue] = useState(initialValue);

  const onChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      resizeTextAreaHeight();
      if (e.target.value === " " && e.target.value.length === 1) {
        return;
      }
      setValue(e.target.value);
    },
    []
  );

  const resizeTextAreaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight - scrollHeightMargin + "px";
    }
  };

  // 텍스트가 없는 경우 엔터키를 막음 빈 문자열 전송을 제한
  const preventKeydownEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.currentTarget.value && e.key === "Enter") {
      e.preventDefault();
      return;
    }
  };

  useEffect(() => {
    resizeTextAreaHeight();
  }, [value, resizeTextAreaHeight]);
  

  return {
    textareaRef,
    value,
    onChangeValue,
    setValue,
    resizeTextAreaHeight,
    preventKeydownEnter
  };
};
