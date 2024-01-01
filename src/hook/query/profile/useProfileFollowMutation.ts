import { useParams } from "react-router-dom";
import { IMyProfileData, IUserProfileData } from "../../../api/apiType";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { follow } from "../../../api/firebase/profileAPI";

export const useProfileFollowMutation = () => {
  // 프로필 페이지에서 팔로우
  const { uid } = useParams();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ myUid, userUid }: { myUid: string; userUid: string }) =>
      follow(myUid, userUid),
    onMutate: async ({ myUid, userUid }) => {
      await queryClient.cancelQueries({
        queryKey: ["profile", "my"]
      });
      const previousMyProfile = await queryClient.getQueryData([
        "profile",
        "my"
      ]);

      // 나의 following 목록애서 대상 유저 추가
      queryClient.setQueryData(["profile", "my"], (data: IMyProfileData) => ({
        ...data,
        followingList: [...data.followingList, userUid]
      }));

      await queryClient.cancelQueries({
        queryKey: ["profile", userUid]
      });

      const previousUserProfile = await queryClient.getQueryData([
        "profile",
        userUid
      ]);

      // 대상 유저 follower 목록에 나를 추가
      queryClient.setQueryData(
        ["profile", userUid],
        (data: IUserProfileData) => ({
          ...data,
          followerList: [...data.followerList, myUid]
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
        queryKey: ["profile", "my"],
        refetchType: "inactive"
      });

      queryClient.invalidateQueries({
        queryKey: ["profile", uid],
        refetchType: "inactive"
      });
    }
  });

  return { mutate };
};
