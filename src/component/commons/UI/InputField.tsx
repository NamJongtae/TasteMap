import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  RefObject
} from "react";
import ErrorMsg from "../errorMsg/ErrorMsg";
import UserInput from "../userInput/UserInput";
import styled from "styled-components";

interface IProps {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  label_hidden?: boolean;
  label?: string;
  name:string;
  id?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  InputRef?: RefObject<HTMLInputElement> | null | undefined;
  errorMsg: string;
  errorMsgSize?: "small";
}

const Wrapper = styled.div`
  & > p {
    margin-top: 10px;
  }
`;

export const InputField = ({
  value,
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
  InputRef,
  errorMsg,
  errorMsgSize
}: IProps) => {
  return (
    <Wrapper>
      <UserInput
        label_hidden={label_hidden}
        label={label}
        name={name}
        id={id}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        InputRef={InputRef}
        maxLength={maxLength}
        minLength={minLength}
      />
      {errorMsg && <ErrorMsg message={errorMsg} className={errorMsgSize} />}
    </Wrapper>
  );
};
