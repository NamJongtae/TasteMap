import React, { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  name: string;
  ref?: React.RefObject<HTMLTextAreaElement | null>;
}
export const useResizeTextArea = ({ name, ref }: IProps) => {
  const { watch } = useFormContext();
  const value = watch(name);
  const textareaRef = ref ? ref : useRef<HTMLTextAreaElement | null>(null);

  const resizeTextAreaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    resizeTextAreaHeight();
  }, [value]);

  return { textareaRef };
};
