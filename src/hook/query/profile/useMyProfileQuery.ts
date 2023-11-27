import { useQuery } from '@tanstack/react-query'
import { fetchMyProfile } from '../../../api/firebase/profileAPI'

export const useMyProfileQuery = (uid: string) => {
  const { data, isPending, refetch, isRefetching } = useQuery({
    queryKey:["profile", "my"],
    queryFn: ()=>fetchMyProfile(uid),
    refetchOnWindowFocus: false,
    enabled: !!uid,
  })

  return { data, isPending, refetch, isRefetching  };
}