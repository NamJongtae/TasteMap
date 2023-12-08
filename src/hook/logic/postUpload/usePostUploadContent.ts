import { useEffect, useRef } from "react";
import { IPostData } from "../../../api/apiType";
import { useTextarea } from "../../useTextarea";

interface IProps {
  isEdit: boolean;
  post: IPostData | undefined;
}
export const usePostUploadContent = ({ isEdit, post }: IProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // content textarea 관리 customhook
  const {
    value: contentValue,
    setValue: setContentValue,
    onChangeValue: onChangeContentValue
  } = useTextarea("", textareaRef, 30);

  /**
   * 게시물 수정시 기존 초기값 설정 */
  const setUpdateInitalValue = () => {
    if (isEdit && post?.content) {
      setContentValue(post.content);
    }
  };

  useEffect(() => {
    setUpdateInitalValue();
  }, [post]);

  return {
    textareaRef,
    contentValue,
    setContentValue,
    onChangeContentValue,
    setUpdateInitalValue
  };
};
