import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  RefObject
} from "react";
import { Input, Label, Wrapper } from "./userInput.styles";
interface IProps {
  value?: string | number | readonly string[] | undefined;
  label_hidden?: boolean;
  label?: string;
  id?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  InputRef?: RefObject<HTMLInputElement> | null | undefined;
}

export default function UserInput({
  value,
  label_hidden,
  label,
  id,
  onChange,
  onBlur,
  maxLength,
  minLength,
  placeholder,
  type,
  InputRef
}: IProps) {
  return (
    <Wrapper>
      <Label className={label_hidden ? "a11y-hidden" : ""} htmlFor={id}>
        {label}
      </Label>
      <Input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        id={id}
        value={value}
        onBlur={onBlur}
        maxLength={maxLength}
        minLength={minLength}
        ref={InputRef}
      />
    </Wrapper>
  );
}
