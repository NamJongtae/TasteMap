import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { reportPost } from "../../../api/firebase/postAPI";
import { IPostData } from "../../../types/apiTypes";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { useParams } from "react-router-dom";
import { getPostsQuerykey } from "../../../querykey/querykey";
import { TPost } from "../../../types/types";

type InfinitePostsType = {
  postDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

export const usePostReportMutation = (
  postType: TPost
) => {
  const { uid } = useParams();
  const queryClient = useQueryClient();
  const POSTS_QUERYKEY = getPostsQuerykey(postType, uid);
  const { mutate } = useMutation({
    mutationFn: (reportData: Pick<IPostData, "id" | "reportCount">) =>
      reportPost(reportData),
    onMutate: async (reportData) => {
      await queryClient.cancelQueries({
        queryKey: POSTS_QUERYKEY
      });

      const previousPosts:
        | InfiniteData<InfinitePostsType, unknown>
        | undefined = queryClient.getQueryData(POSTS_QUERYKEY);

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
        POSTS_QUERYKEY,
        (data: InfiniteData<InfinitePostsType, unknown>) => ({
          ...data,
          pages: newPages
        })
      );

      return { previousPosts };
    },
    onError: (error, data, ctx) => {
      if (ctx) {
        queryClient.setQueryData(POSTS_QUERYKEY, ctx.previousPosts);
      }
      if (error.message === "게시물이 존재하지 않습니다.") {
        sweetToast("삭제된 게시물입니다!", "warning");
        // 게시물 삭제
        queryClient.setQueryData(
          POSTS_QUERYKEY,
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
        queryKey: POSTS_QUERYKEY,
        refetchType: "inactive"
      });
    }
  });

  return { mutate };
};
