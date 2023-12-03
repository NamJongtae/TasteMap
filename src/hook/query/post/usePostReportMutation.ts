import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { reportPost } from "../../../api/firebase/postAPI";
import { IPostData } from "../../../api/apiType";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { useParams } from "react-router-dom";

type InfinitePostsType = {
  postDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

export const usePostReportMutation = (
  postType: "HOME" | "FEED" | "PROFILE"
) => {
  const { uid } = useParams();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (reportData: Pick<IPostData, "id" | "reportCount">) =>
      reportPost(reportData),
    onMutate: async (reportData) => {
      await queryClient.cancelQueries({
        queryKey:
          postType === "PROFILE"
            ? ["posts", postType, uid]
            : ["posts", postType]
      });

      const previousPosts:
        | InfiniteData<InfinitePostsType, unknown>
        | undefined = await queryClient.getQueryData(
        postType === "PROFILE" ? ["posts", postType, uid] : ["posts", postType]
      );

      const newPages = previousPosts?.pages.map((page: InfinitePostsType) => {
        return {
          ...page,
          data: page.data.map((post: IPostData) =>
            post.id === reportData.id
              ? {
                  ...post,
                  reportCount: post.reportCount + 1,
                  isBlock: post.reportCount >= 4,
                  reportUidList: [
                    ...post.reportUidList,
                    getAuth().currentUser?.uid
                  ]
                }
              : post
          )
        };
      });

      queryClient.setQueryData(
        postType === "PROFILE" ? ["posts", postType, uid] : ["posts", postType],
        (data: InfiniteData<InfinitePostsType, unknown>) => ({
          ...data,
          pages: newPages
        })
      );

      return { previousPosts };
    },
    onError: (error, data, ctx) => {
      if (ctx) {
        queryClient.setQueryData(
          postType === "PROFILE"
            ? ["posts", postType, uid]
            : ["posts", postType],
          ctx.previousPosts
        );
      }
      if (error.message === "게시물이 존재하지 않습니다.") {
        sweetToast("삭제된 게시물입니다!", "warning");
        // 게시물 삭제
        queryClient.setQueryData(
          postType === "PROFILE"
            ? ["posts", postType, uid]
            : ["posts", postType],
          (postsData: InfiniteData<InfinitePostsType, unknown>) => ({
            ...postsData,
            pages: postsData.pages.map((page: InfinitePostsType) => ({
              ...page,
              data: page.data.filter((post: IPostData) => post.id !== data.id)
            }))
          })
        );
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
        console.log(error);
      }
    },
    onSuccess: () => {
      sweetToast("신고가 완료되었습니다.", "success");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey:
          postType === "PROFILE"
            ? ["posts", postType, uid]
            : ["posts", postType],
        refetchType: "inactive"
      });
    }
  });

  return { mutate };
};
