import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "../../../api/firebase/postAPI";

export const useLoadPostQuery = (postId: string) => {
  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: ["comment"],
    queryFn: () => fetchPost(postId)
  });

  return { data, isPending, isFetching, isError, error };
};
