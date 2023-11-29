import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "../../../api/firebase/postAPI";

export const useLoadPostQuery = (isEdit:boolean, postId: string) => {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
    enabled: isEdit && !!postId
  });

  return { data, isFetching, isError, error };
};
