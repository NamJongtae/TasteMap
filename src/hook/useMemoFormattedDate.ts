import { useMemo } from "react";
import { setDateFormat } from "../library/setDateFormat";

export const useMemoFormattedDate = (time: number) => {

  const memoizedFormattedDate = useMemo(() => {
    return setDateFormat(time);
  }, []);

  return memoizedFormattedDate;
};
