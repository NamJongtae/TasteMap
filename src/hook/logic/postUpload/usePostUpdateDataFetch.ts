import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useCallback } from "react";
import { IPostData, IPostUpdateData } from "../../../api/apiType";
import { usePostUpdateMutation } from "../../query/post/usePostUpdateMutation";
import { useCheckVaildationUser } from "./useCheckVaildationUser";
import { FieldValues } from "react-hook-form";

interface IProps {
  post: IPostData | undefined;
}
export const usePostUpdateDataFetch = ({ post }: IProps) => {
  const searchSelectedMap = useSelector(
    (state: RootState) => state.tasteMap.searchSelectedMap
  );

  const { mutate: updatePostMutate, isPending: updatePostLoading } =
    usePostUpdateMutation();

  /**
   *
   * 게시물 업로드 함수 */
  const postUpdateHandler = useCallback(
    async (data: FieldValues) => {
      // 내용이 비었거나 맛집을 선택하지 않았을 경우 return
      if (!data.content || !data.map) return;
      if (post) {
        const editPostData: IPostUpdateData = {
          id: post!.id || "",
          content: data.content,
          rating: data.rating,
          mapData: data.map,
          imgURL: data.imgURL,
          imgName: data.imgName,
          img: data.img
        };
        updatePostMutate({
          prevPostDataImgName: post,
          newPost: editPostData
        });
      }
    },
    [post, searchSelectedMap]
  );

  /**
   * 게시물 수정 사용자 확인 */
  useCheckVaildationUser({ post });

  return { postUpdateHandler, updatePostLoading };
};
