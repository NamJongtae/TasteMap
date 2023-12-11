import { useEffect } from "react";

export const useFocusing = (targetRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.focus();
    }
  }, [targetRef.current]);
};
