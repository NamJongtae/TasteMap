import { useCallback } from "react";
import { sweetToast } from "../../../../library/sweetAlert/sweetAlert";
import { useAddLikeMutation } from "../../../query/profile/useAddLikeMutation";
import { useRemoveLikeMutation } from "../../../query/profile/useRemoveLikeMutation";
import { IMyProfileData, IPostData } from "../../../../types/apiTypes";

interface IProps {
  data: IPostData;
  myProfile: IMyProfileData;
  postType: "HOME" | "FEED" | "PROFILE";
}

export const usePostLike = ({ data, myProfile, postType }: IProps) => {
  const isLike = myProfile.likeList.includes(data.id);
  const likeCount = data.likeCount;

  const { mutate: addLikeMutate } = useAddLikeMutation(postType);
  const { mutate: removeLikeMutate } = useRemoveLikeMutation(postType);

  /**
   * 좋아요 추가 함수
   */
  const addLikeHandler = useCallback(
    (id: string) => {
      // 자기 자신의 게시물에 좋아요를 누르면 retun
      if (myProfile.uid === data.uid) {
        sweetToast("자신의 게시물은 좋아요할 수 없습니다!", "warning");
        return;
      }
      addLikeMutate(id);
    },
    [myProfile]
  );

  /**
   * 좋아요 제거 함수
   */
  const removeLikeHandler = useCallback((id: string) => {
    removeLikeMutate(id);
  }, []);

  const toggleLikeHandler = useCallback((id: string) => {
    if (isLike) {
      removeLikeHandler(id);
    } else {
      addLikeHandler(id);
    }
  }, [isLike]);

  return { isLike, likeCount, toggleLikeHandler };
};
