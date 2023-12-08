import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useCallback } from "react";
import { IMapData, IPostData, IPostUpdateData } from "../../../api/apiType";
import { usePostUpdateMutation } from "../../query/post/usePostUpdateMutation";
import { useCheckVaildationUser } from "./useCheckVaildationUser";

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
    async (
      content: string,
      rating: number,
      mapData: IMapData,
      imgURL: string[],
      imgName: string[],
      img: File[]
    ) => {
      // 내용이 비었거나 맛집을 선택하지 않았을 경우 return
      if (!content || !searchSelectedMap.mapx) return;
      if (post) {
        const editPostData: IPostUpdateData = {
          id: post!.id,
          content,
          rating,
          mapData,
          imgURL,
          imgName,
          img
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
