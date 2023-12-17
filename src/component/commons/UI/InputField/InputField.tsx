import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  RefObject
} from "react";
import UserInput from "../../userInput/UserInput";
import { FieldValues, Validate, ValidationRule } from "react-hook-form";
import { Wrapper } from './inputField.styles';

interface IProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  label_hidden?: boolean;
  label?: string;
  name: string;
  id?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  InputRef?: RefObject<HTMLInputElement> | null | undefined;
  inputStyle?: React.CSSProperties;
  duplicationErrorMsg?: string;
  errorMsgSize?: "small";
  required: boolean;
  pattern?: ValidationRule<RegExp> | undefined;
  validate?:
    | Validate<any, FieldValues>
    | Record<string, Validate<any, FieldValues>>
    | undefined;
}



export const InputField = ({
  onChange,
  label_hidden,
  label,
  name,
  id,
  onBlur,
  maxLength,
  minLength,
  placeholder,
  type,
  inputStyle,
  pattern,
  duplicationErrorMsg,
  errorMsgSize,
  required,
  validate
}: IProps) => {
  return (
    <Wrapper>
      <UserInput
        label_hidden={label_hidden}
        label={label}
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        inputStyle={inputStyle}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        duplicationErrorMsg={duplicationErrorMsg}
        errorMsgSize={errorMsgSize}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        validate={validate}
      />
    </Wrapper>
  );
};
