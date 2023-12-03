import { useEffect } from "react";
import { IPostData } from "../../../api/apiType";
import { useTextarea } from "../profile/profileUpdate/useTextarea";

interface IProps {
  isEdit: boolean;
  post: IPostData | undefined;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}
export const usePostUploadContent = ({ isEdit, post, textareaRef }: IProps) => {
  // content textarea 관리 customhook
  const {
    value: contentValue,
    setValue: setContentValue,
    onChangeValue: onChangeContentValue
  } = useTextarea("", textareaRef);

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
    contentValue,
    setContentValue,
    onChangeContentValue,
    setUpdateInitalValue
  };
};
