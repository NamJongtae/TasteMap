import { useQuery } from "@tanstack/react-query";
import { fetchMyProfile } from "../../../api/firebase/profileAPI";
import { My_PROFILE_QUERYKEY } from "../../../querykey/querykey";

export const useMyProfileQuery = (uid: string) => {
  const { data, isPending, isFetching, isRefetching, isError, error } =
    useQuery({
      queryKey: My_PROFILE_QUERYKEY,
      queryFn: () => fetchMyProfile(uid),
      refetchOnWindowFocus: false,
      enabled: !!uid
    });

  return { data, isPending, isFetching, isRefetching, isError, error };
};
