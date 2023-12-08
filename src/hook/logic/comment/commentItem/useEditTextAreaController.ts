import { useCallback, useState } from "react";

export const useEditTextAreaController = () => {
  const [isEdit, setIsEdit] = useState(false);

  const openEditTextareaHandler = useCallback(() => {
    setIsEdit(true);
  }, []);

  const closeEditTextareaHandler = useCallback(() => {
    setIsEdit(false);
  }, []);

  return { isEdit, openEditTextareaHandler, closeEditTextareaHandler };
};
