import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
} from "react";
import { Input, Label, Wrapper } from "./userInput.styles";
import {
  FieldValues,
  Validate,
  ValidationRule,
  useFormContext
} from "react-hook-form";
import ErrorMsg from "../errorMsg/ErrorMsg";

interface IProps {
  label_hidden?: boolean;
  label?: string;
  name: string;
  id?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  inputStyle?: React.CSSProperties;
  pattern: ValidationRule<RegExp> | undefined;
  duplicationErrorMsg?: string;
  errorMsgSize?: "small";
  required: boolean;
  validate?:
    | Validate<any, FieldValues>
    | Record<string, Validate<any, FieldValues>>
    | undefined;
}

export default function UserInput({
  label_hidden,
  label,
  name,
  id,
  onChange,
  onBlur,
  maxLength,
  minLength,
  placeholder,
  type,
  inputStyle,
  pattern,
  errorMsgSize,
  required,
  validate
}: IProps) {
  const { register, formState } = useFormContext();
  const error = formState.errors[name];

  return (
    <>
      <Wrapper>
        <Label className={label_hidden ? "a11y-hidden" : ""} htmlFor={id}>
          {label}
        </Label>
        <Input
          type={type}
          placeholder={placeholder}
          id={id}
          maxLength={maxLength}
          minLength={minLength}
          style={inputStyle}
          {...register(name, {
            required,
            onChange,
            onBlur,
            pattern,
            validate
          })}
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
