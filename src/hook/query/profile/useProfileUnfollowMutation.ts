import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IMyProfileData, IUserProfileData } from "../../../types/apiTypes";
import { unfollow } from "../../../api/firebase/profileAPI";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { useParams } from "react-router-dom";
import {
  My_PROFILE_QUERYKEY,
  getUserProfileQuerykey
} from "../../../querykey/querykey";

export const useProfileUnfollowMutation = () => {
  // 프로핊 페이지에서 언팔로우

  const { uid } = useParams();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ myUid, userUid }: { myUid: string; userUid: string }) =>
      unfollow(myUid, userUid),
    onMutate: async ({ myUid, userUid }) => {
      await queryClient.cancelQueries({
        queryKey: My_PROFILE_QUERYKEY
      });
      const previousMyProfile = queryClient.getQueryData(My_PROFILE_QUERYKEY);

      // 나의 following 목록에서 상대 유저를 제거
      queryClient.setQueryData(My_PROFILE_QUERYKEY, (data: IMyProfileData) => ({
        ...data,
        followingList: data.followingList.filter((uid) => uid !== userUid)
      }));

      const USER_PROFILE_QUERYKEY = getUserProfileQuerykey(userUid);
      await queryClient.cancelQueries({
        queryKey: USER_PROFILE_QUERYKEY
      });
      const previousUserProfile = queryClient.getQueryData([
        "profile",
        userUid
      ]);

      // 상대 follower 목록에서 나를 제거
      queryClient.setQueryData(
        USER_PROFILE_QUERYKEY,
        (data: IUserProfileData) => ({
          ...data,
          followerList: data.followerList.filter((uid) => uid !== myUid)
        })
      );

      return { previousMyProfile, previousUserProfile };
    },
    onError: (error) => {
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: My_PROFILE_QUERYKEY,
        refetchType: "inactive"
      });

      if (!uid) return;
      const USER_PROFILE_QUERYKEY = getUserProfileQuerykey(uid);
      queryClient.invalidateQueries({
        queryKey: USER_PROFILE_QUERYKEY,
        refetchType: "inactive"
      });
    }
  });

  return { mutate };
};
