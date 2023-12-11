import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../../../api/firebase/profileAPI";

export const useUserProfileQuery = (uid: string) => {
  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: ["profile", uid],
    queryFn: async () => await fetchUserProfile(uid),
    enabled: !!uid,
    retry: 1
  });

  return { data, isPending, isFetching, isError };
};
