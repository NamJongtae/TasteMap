import React, { useRef } from "react";
import HeaderBtn from "./HeaderBtn/HeaderBtn";
import { MyForm } from "../../../component/commons/UI/myForm/MyForm";
import { usePostUploadDataFetch } from "../../../hook/logic/postUpload/usePostUploadDataFetch";
import { usePostUpdateDataFetch } from "../../../hook/logic/postUpload/usePostUpdateDataFetch";
import { IPostData } from "../../../types/apiTypes";
import Loading from "../../../component/commons/loading/Loading";
import FormContent from "./FormContent/FormContent";

interface IProps {
  isEdit: boolean;
  post: IPostData | undefined;
}
export default function PostUploadForm({ isEdit, post }: IProps) {
  const formContentWrapperRef = useRef<HTMLDivElement>(null);

  const { postUpdateHandler, updatePostLoading } = usePostUpdateDataFetch({
    post
  });

  const { postUploadHandler, uploadPostLoading } = usePostUploadDataFetch();

  if (uploadPostLoading || updatePostLoading) {
    return <Loading />;
  }

  return (
    <MyForm
      onSubmit={(data) => {
        isEdit ? postUpdateHandler(data) : postUploadHandler(data);
      }}
      formOptions={{
        mode: "onSubmit",
        defaultValues: {
          map: isEdit ? post?.mapData : [],
          rating: isEdit ? post?.rating : 0,
          content: isEdit ? post?.content : "",
          img: isEdit ? post?.imgURL.map(() => ({}) as File) : [],
          imgName: isEdit ? post?.imgName : [],
          imgURL: isEdit ? post?.imgURL : []
        }
      }}
    >
      <HeaderBtn isEdit={isEdit} />
      <FormContent
        formContentWrapperRef={formContentWrapperRef}
        isEdit={isEdit}
        post={post}
      />
    </MyForm>
  );
}
