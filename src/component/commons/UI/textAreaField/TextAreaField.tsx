import React, { ChangeEventHandler } from "react";
import { FieldValues, Validate, useFormContext } from "react-hook-form";
import ErrorMsg from "../../errorMsg/ErrorMsg";
import { Wrapper, Label, TextArea } from "./textAreaField.styles";
interface IProps {
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  label_hidden?: boolean;
  label: string;
  name: string;
  id: string;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  textareaRef?: React.MutableRefObject<HTMLTextAreaElement | null>;
  textareaStyle?: React.CSSProperties;
  required: boolean;
  errorMsgSize?: "small";
  validate?:
    | Validate<any, FieldValues>
    | Record<string, Validate<any, FieldValues>>
    | undefined;
  rows?: number;
}

export default function TextAreaField({
  onChange,
  onKeyDown,
  label_hidden,
  label,
  name,
  id,
  maxLength,
  minLength,
  placeholder,
  textareaStyle,
  textareaRef,
  required,
  errorMsgSize,
  validate,
  rows
}: IProps) {
  const { register, formState } = useFormContext();
  const { ref, ...rest } = register(name, {
    validate,
    onChange,
    maxLength,
    minLength,
    required
  });
  const error = formState.errors[name];

  return (
    <>
      <Wrapper>
        <Label className={label_hidden ? "a11y-hidden" : ""} htmlFor={id}>
          {label}
        </Label>
        <TextArea
          id={id}
          placeholder={placeholder}
          style={textareaStyle}
          rows={rows}
          {...rest}
          ref={(e) => {
            ref(e);
            if (textareaRef) textareaRef.current = e;
          }}
          onKeyDown={onKeyDown}
        />
      </Wrapper>
      {error && (
        <ErrorMsg
          message={typeof error.message === "string" ? error.message : ""}
          className={errorMsgSize}
        />
      )}
    </>
  );
}
