import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "../../../api/firebase/postAPI";
import { getPostQuerykey } from "../../../querykey/querykey";

export const useLoadPostQuery = (isEdit: boolean, postId: string) => {
  const POST_QUERYKEY = getPostQuerykey(postId);
  const { data, isFetching, isError, error } = useQuery({
    queryKey: POST_QUERYKEY,
    queryFn: () => fetchPost(postId),
    enabled: isEdit && !!postId
  });

  return { data, isFetching, isError, error };
};
