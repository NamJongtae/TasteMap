import { useQuery } from "@tanstack/react-query";
import { fetchMyProfile } from "../../../api/firebase/profileAPI";

export const useMyProfileQuery = (uid: string) => {
  const { data, isPending, isFetching,isRefetching, isError, error } = useQuery({
    queryKey: ["profile", "my"],
    queryFn: () => fetchMyProfile(uid),
    refetchOnWindowFocus: false,
    enabled: !!uid
  });

  return { data, isPending, isFetching, isRefetching, isError, error };
};
