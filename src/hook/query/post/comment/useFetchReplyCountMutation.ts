import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { fetchComment } from "../../../../api/firebase/commentAPI";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { ICommentData } from "../../../../api/apiType";
import { getCommentsQuerykey } from "../../../../querykey/querykey";

type InfinitCommentsType = {
  commentDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: ICommentData[];
};

export const useFetchReplyCountMutation = (postId: string) => {
  const queryClient = useQueryClient();
  const COMMENTS_QUERYKEY = getCommentsQuerykey(postId);

  const { mutate } = useMutation({
    mutationFn: (commentId: string) => fetchComment(commentId),
    onSuccess: (result) => {
      queryClient.setQueryData(
        COMMENTS_QUERYKEY,
        (data: InfiniteData<InfinitCommentsType, unknown>) => ({
          ...data,
          pages: data.pages.map((page: InfinitCommentsType) => ({
            ...page,
            data: page.data.map((comment: ICommentData) =>
              comment.commentId === result?.commentId
                ? { ...comment, replyCount: result?.replyCount }
                : comment
            )
          }))
        })
      );
    }
  });

  return { mutate };
};
