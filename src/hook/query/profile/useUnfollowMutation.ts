import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { unfollow } from "../../../api/firebase/profileAPI";
import {
  IFollowData,
  IMyProfileData,
  IUserProfileData
} from "../../../api/apiType";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { RootState } from "../../../store/store";
import { useLocation, useParams } from "react-router-dom";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";

interface InfiniteFollowersType {
  followingDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IFollowData[];
}

export const useUnfollowMutation = () => {
  const { uid } = useParams();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const isOpenFollowerModal = useSelector(
    (state: RootState) => state.user.isOpenFollowerModal
  );
  const isOpenFollowingModal = useSelector(
    (state: RootState) => state.user.isOpenFollowingModal
  );
  const { mutate } = useMutation({
    mutationFn: ({ myUid, userUid }: { myUid: string; userUid: string }) =>
      unfollow(myUid, userUid),
    onMutate: async ({ myUid, userUid }) => {
      await queryClient.cancelQueries({
        queryKey: ["profile", "my"]
      });
      const previousMyProfile = await queryClient.getQueryData([
        "profile",
        "my"
      ]);
      queryClient.setQueryData(["profile", "my"], (data: IMyProfileData) => ({
        ...data,
        followingList: data.followingList.filter((uid) => uid !== userUid)
      }));

      const previousFollowingList:
        | InfiniteData<InfiniteFollowersType, unknown>
        | undefined = await queryClient.getQueryData(["profile", "following"]);

      let previousUserProfile: unknown;

      // 모달창이 열렸을 경우는 상대방의 팔로워 팔로잉 목록을 출력, 나의 팔로우 여부가 표시되어, 팔로우 언팔로우시 나의 Following 목록에만 변화를 주어야함, 현재 프로필 정보 상대방의 팔로잉 목록을 변경 하면 안됨
      // 검색 페이지가 아닐 때만 user정보를 변경 검색 페이지에서는 팔로우하는 유저 정보를 불러올 필요가 없음
      if (
        !isOpenFollowingModal &&
        !isOpenFollowerModal &&
        !pathname.includes("search")
      ) {
        await queryClient.cancelQueries({
          queryKey: ["profile", userUid]
        });
        previousUserProfile = await queryClient.getQueryData([
          "profile",
          userUid
        ]);
        queryClient.setQueryData(
          ["profile", userUid],
          (data: IUserProfileData) => ({
            ...data,
            followerList: data.followerList.filter((uid) => uid !== myUid)
          })
        );
      }

      // 내 프로필인 경우(uid가 없을 때), followingModal이 열렸을 때, 검색 페이지가 아닐 떼
      // 언팔로우 시 해당 유저 팔로잉 모달 목록에서 제거
      if (!uid && isOpenFollowingModal && !pathname.includes("search")) {
        const newFollowingList = previousFollowingList?.pages.map(
          (page: InfiniteFollowersType) => {
            return {
              ...page,
              data: page.data.filter(
                (data: IFollowData) => data.uid !== userUid
              )
            };
          }
        );

        queryClient.setQueryData(
          ["profile", "following"],
          (data: InfiniteData<InfiniteFollowersType, unknown>) => ({
            ...data,
            pages: newFollowingList
          })
        );
      }

      return { previousMyProfile, previousUserProfile, previousFollowingList };
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

      if (
        !isOpenFollowerModal &&
        !isOpenFollowingModal &&
        !pathname.includes("search")
      ) {
        queryClient.invalidateQueries({
          queryKey: ["profile", uid],
          refetchType: "inactive"
        });
      }

      if (!uid && isOpenFollowingModal &&  !pathname.includes("search"))
        queryClient.invalidateQueries({
          queryKey: ["profile", "following"],
          refetchType: "inactive"
        });
    }
  });

  return { mutate };
};
