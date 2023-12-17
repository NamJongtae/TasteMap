import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { updateMyProfile } from "../../../api/firebase/profileAPI";
import {
  IMyProfileData,
  IPostData,
  IProfileUpdateData
} from "../../../api/apiType";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { userSlice } from "../../../slice/userSlice";

type InfinitePostsType = {
  postDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const dispatch = useDispatch<AppDispatch>();

  const { mutate, isPending } = useMutation({
    mutationFn: (updateProfileData: IProfileUpdateData) =>
      updateMyProfile(updateProfileData),
    onMutate: async (updateProfileData) => {
      const img = updateProfileData.file;
      let imgURL: string = "";
      if (typeof img !== "string") {
        imgURL = URL.createObjectURL(img);
      } else {
        imgURL = process.env.REACT_APP_DEFAULT_PROFILE_IMG || "";
      }

      await queryClient.cancelQueries({
        queryKey: ["profile", "my"]
      });

      await queryClient.cancelQueries({
        queryKey: ["posts", "PROFILE", myInfo.uid]
      });

      const previousMyProfile: IMyProfileData | undefined =
        await queryClient.getQueryData(["profile", "my"]);

      const previousPosts:
        | InfiniteData<InfinitePostsType, unknown>
        | undefined = await queryClient.getQueryData([
        "posts",
        "PROFILE",
        myInfo.uid
      ]);

      const updateMyProfile = {
        ...previousMyProfile,
        photoURL: imgURL || previousMyProfile?.photoURL,
        displayName:
          updateProfileData.displayName || previousMyProfile?.displayName,
        introduce: updateProfileData.introduce || previousMyProfile?.introduce
      };

      const updatePosts = previousPosts?.pages.map((page) => {
        return {
          ...page,
          data: page.data.map((post) => {
            return {
              ...post,
              displayName: updateProfileData.displayName,
              photoURL: imgURL || previousMyProfile!.photoURL
            };
          })
        };
      });

      queryClient.setQueryData(["profile", "my"], updateMyProfile);
      queryClient.setQueryData(
        ["posts", "PROFILE", myInfo.uid],
        (data: InfiniteData<InfinitePostsType, unknown>) => ({
          ...data,
          pages: updatePosts
        })
      );

      return { previousMyProfile, previousPosts };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", "my"],
        refetchType: "inactive"
      });
      queryClient.invalidateQueries({
        queryKey: ["posts", "PROFILE", myInfo.uid],
        refetchType: "inactive"
      });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      dispatch(userSlice.actions.setIsOpenUpdateProfileModal(false));
    },
    onError: (error, data, ctx) => {
      if (ctx) {
        queryClient.setQueryData(["posts", "HOME"], ctx.previousMyProfile);
        queryClient.setQueryData(
          ["posts", "PROFILE", myInfo.uid],
          ctx.previousPosts
        );
      }
      if (error) {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
        console.log(error);
      }
    }
  });

  return { mutate, isPending };
};
