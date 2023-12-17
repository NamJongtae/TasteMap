import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { Dim, Wrapper } from "./portalModal.styles";

interface PortalProps {
  children: ReactNode;
  targetId: string;
  closeModalHandler: () => void;
}

export const PortalModal: React.FC<PortalProps> = ({
  children,
  targetId,
  closeModalHandler
}) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Wrapper
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.keyCode === 27) {
              closeModalHandler();
            }
          }}
        >
          <Dim onClick={closeModalHandler}></Dim>
          {children}
        </Wrapper>,
        document.getElementById(targetId) as HTMLDivElement
      )}
    </>
  );
};
