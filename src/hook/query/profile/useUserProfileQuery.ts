import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../../../api/firebase/profileAPI";
import { getUserProfileQuerykey } from "../../../querykey/querykey";

export const useUserProfileQuery = (uid: string) => {
  const USER_PROFILE_QUERYKEY = getUserProfileQuerykey(uid);
  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: USER_PROFILE_QUERYKEY,
    queryFn: async () => await fetchUserProfile(uid),
    enabled: !!uid,
    retry: 1
  });

  return { data, isPending, isFetching, isError };
};
