import { ReactNode } from "react";
import { Dim, Wrapper } from "./modal.styles";

interface IProps {
  children: ReactNode;
  closeModalHanlder: () => void;
}

export const Modal = ({ children, closeModalHanlder }: IProps) => {
  return (
    <Wrapper
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 27) {
          closeModalHanlder();
        }
      }}
    >
      <Dim onClick={closeModalHanlder}></Dim>
      {children}
    </Wrapper>
  );
};
