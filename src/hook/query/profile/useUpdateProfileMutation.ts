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
} from "../../../types/apiTypes";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { userSlice } from "../../../slice/userSlice";
import {
  AUTH_QUERYKEY,
  HOME_POSTS_QUERYKEY,
  My_PROFILE_QUERYKEY,
  getProfilePostsQuerykey
} from "../../../querykey/querykey";

type InfinitePostsType = {
  postDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const dispatch = useDispatch<AppDispatch>();
  const PROFILE_POSTS_QUERYKEY = getProfilePostsQuerykey(myInfo.uid);
  const { mutate, isPending } = useMutation({
    mutationFn: (updateProfileData: IProfileUpdateData) =>
      updateMyProfile(updateProfileData),
    onMutate: async (updateProfileData) => {
      const img = updateProfileData.file;
      let imgURL: string = "";
      if (typeof img !== "string") {
        imgURL = URL.createObjectURL(img);
      } else if (img === process.env.REACT_APP_DEFAULT_PROFILE_IMG) {
        imgURL = process.env.REACT_APP_DEFAULT_PROFILE_IMG;
      }

      await queryClient.cancelQueries({
        queryKey: My_PROFILE_QUERYKEY
      });

      await queryClient.cancelQueries({
        queryKey: PROFILE_POSTS_QUERYKEY
      });

      const previousMyProfile: IMyProfileData | undefined =
        queryClient.getQueryData(My_PROFILE_QUERYKEY);

      const previousPosts:
        | InfiniteData<InfinitePostsType, unknown>
        | undefined = queryClient.getQueryData(PROFILE_POSTS_QUERYKEY);

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

      queryClient.setQueryData(My_PROFILE_QUERYKEY, updateMyProfile);
      queryClient.setQueryData(
        PROFILE_POSTS_QUERYKEY,
        (data: InfiniteData<InfinitePostsType, unknown>) => ({
          ...data,
          pages: updatePosts
        })
      );

      return { previousMyProfile, previousPosts };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: My_PROFILE_QUERYKEY,
        refetchType: "inactive"
      });
      queryClient.invalidateQueries({
        queryKey: PROFILE_POSTS_QUERYKEY,
        refetchType: "inactive"
      });
      queryClient.invalidateQueries({ queryKey: AUTH_QUERYKEY });
      dispatch(userSlice.actions.setIsOpenUpdateProfileModal(false));
    },
    onError: (error, data, ctx) => {
      if (ctx) {
        queryClient.setQueryData(HOME_POSTS_QUERYKEY, ctx.previousMyProfile);
        queryClient.setQueryData(PROFILE_POSTS_QUERYKEY, ctx.previousPosts);
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
