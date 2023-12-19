import React from "react";
import Header from "../../../../component/commons/layouts/header/Header";
import { useFormContext } from "react-hook-form";

interface IProps {
  isEdit: boolean;
}

export default function HeaderBtn({ isEdit }: IProps) {
  const { formState } = useFormContext();

  return (
    <Header
      type='upload'
      btnText={isEdit ? "수정" : "업로드"}
      disabled={!formState.isDirty}
    />
  );
}
