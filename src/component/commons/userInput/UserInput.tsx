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
  name: string;
  id?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  InputRef?: RefObject<HTMLInputElement> | null | undefined;
  inputStyle?: React.CSSProperties;
}

export default function UserInput({
  value,
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
  InputRef,
  inputStyle
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
        name={name}
        value={value}
        onBlur={onBlur}
        maxLength={maxLength}
        minLength={minLength}
        ref={InputRef}
        style={inputStyle}
      />
    </Wrapper>
  );
}
