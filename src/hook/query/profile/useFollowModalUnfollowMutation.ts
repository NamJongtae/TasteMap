import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { IFollowData, IMyProfileData } from "../../../api/apiType";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { unfollow } from "../../../api/firebase/profileAPI";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { FOLLOWING_QUERYKEY, My_PROFILE_QUERYKEY } from "../../../querykey/querykey";

interface InfiniteFollowingType {
  followingDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IFollowData[];
}

export const useFollowModalUnfollowMutation = () => {
  // 내 프로필상에서 Follower/Following 모달창에서 언팔로우 버튼을 눌렀을 때
  // Following 목록이 즉시 반영되도록 하기 위해 낙관적 업데이트를 사용

  const { uid } = useParams();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const isOpenFollowingModal = useSelector(
    (state: RootState) => state.user.isOpenFollowingModal
  );
  const { mutate } = useMutation({
    mutationFn: ({ myUid, userUid }: { myUid: string; userUid: string }) =>
      unfollow(myUid, userUid),
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
        followingList: data.followingList.filter((uid) => uid !== userUid)
      }));

      const previousFollowingList:
        | InfiniteData<InfiniteFollowingType, unknown>
        | undefined = queryClient.getQueryData(FOLLOWING_QUERYKEY);

      // 내 프로필인 경우(uid가 없을 때), followingModal이 열렸을 경우
      // 검색 페이지가 아닌경우
      // 언팔로우 시 해당 유저 팔로잉 모달 목록에서 제거
      if (!uid && isOpenFollowingModal && !pathname.includes("search")) {
        const newFollowingList = previousFollowingList?.pages.map(
          (page: InfiniteFollowingType) => {
            return {
              ...page,
              data: page.data.filter(
                (data: IFollowData) => data.uid !== userUid
              )
            };
          }
        );

        queryClient.setQueryData(
          FOLLOWING_QUERYKEY,
          (data: InfiniteData<InfiniteFollowingType, unknown>) => ({
            ...data,
            pages: newFollowingList
          })
        );
      }

      return { previousMyProfile, previousFollowingList };
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

      if (!uid && isOpenFollowingModal && !pathname.includes("search"))
        queryClient.invalidateQueries({
          queryKey: FOLLOWING_QUERYKEY,
          refetchType: "inactive"
        });
    }
  });

  return { mutate };
};
