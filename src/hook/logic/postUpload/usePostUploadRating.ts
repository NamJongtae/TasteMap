import { useEffect, useState } from "react";
import { IPostData } from "../../../api/apiType";

interface IProps {
  isEdit: boolean;
  post: IPostData | undefined;
}

export const usePostUploadRating = ({ isEdit, post }: IProps) => {
  // 별점
  const [ratingValue, setRatingValue] = useState(0);

  /**
   * 게시물 수정시 기존 초기값 설정 */
  const setUpdateInitalValue = () => {
    if (isEdit && post?.rating) {
      setRatingValue(post.rating);
    }
  };

  useEffect(() => {
    setUpdateInitalValue();
  }, [post]);

  return { ratingValue, setRatingValue };
};
