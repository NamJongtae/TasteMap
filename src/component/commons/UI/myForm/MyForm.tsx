import React from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  UseFormProps,
  FieldValues
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Form } from "./myForm.styles";

// 제네릭 타입을 사용한 폼 interface 정의
interface GenericFormInterface<TFormData extends FieldValues> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<TFormData>;
  formOptions?: UseFormProps<TFormData>;
}

export const MyForm = <TFormData extends FieldValues>({
  children,
  onSubmit,
  formOptions
}: GenericFormInterface<TFormData>) => {
  const methods = useForm<TFormData>(formOptions);
  return (
    // form provider를 통해 useForm에서 가져온 methods를 children (하위 컴포넌트)에 전달
    <>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          {children}
        </Form>
        <DevTool control={methods.control} />
      </FormProvider>
    </>
  );
};
