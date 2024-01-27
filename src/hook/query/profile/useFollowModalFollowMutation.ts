import { IMyProfileData } from "../../../api/apiType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { follow } from "../../../api/firebase/profileAPI";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { My_PROFILE_QUERYKEY } from "../../../querykey/querykey";

export const useFollowModalFollowMutation = () => {
  // 내 프로필상에서 Follower/Following 모달창에서 팔로우 버튼을 눌렀을 때
  // Following 목록이 즉시 반영되도록 하기 위해 낙관적 업데이트를 사용 
  
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ myUid, userUid }: { myUid: string; userUid: string }) =>
      follow(myUid, userUid),
    onMutate: async ({ userUid }) => {
      await queryClient.cancelQueries({
        queryKey: My_PROFILE_QUERYKEY
      });
      const previousMyProfile = queryClient.getQueryData([
        "profile",
        "my"
      ]);
      queryClient.setQueryData(My_PROFILE_QUERYKEY, (data: IMyProfileData) => ({
        ...data,
        followingList: [...data.followingList, userUid]
      }));

      return { previousMyProfile };
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
    }
  });

  return { mutate };
};
