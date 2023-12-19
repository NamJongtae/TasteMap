import { useCallback, useState } from "react";

export const useUpdateTextAreaController = () => {
  const [isEdit, setIsEdit] = useState(false);

  const openUpdateTextareaHandler = useCallback(() => {
    setIsEdit(true);
  }, []);

  const closeUpdateTextareaHandler = useCallback(() => {
    setIsEdit(false);
  }, []);

  return { isEdit, openUpdateTextareaHandler, closeUpdateTextareaHandler };
};
