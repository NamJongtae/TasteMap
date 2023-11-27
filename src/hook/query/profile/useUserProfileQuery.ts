import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../../../api/firebase/profileAPI";

export const useUserProfileQuery = (uid: string) => {
  const { data, isPending, refetch, isFetching } = useQuery({
    queryKey: ["profile", "user"],
    queryFn: async () => await fetchUserProfile(uid),
    enabled: !!uid,
    retry: 1,
  });

  return { data, isPending, refetch, isFetching };
};
