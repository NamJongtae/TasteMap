import { useQuery } from "@tanstack/react-query";
import { fetchAuth } from "../../../api/firebase/authAPI";
import { AUTH_QUERYKEY } from "../../../querykey/querykey";

export const useAuthQuery = () => {
  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: AUTH_QUERYKEY,
    queryFn: fetchAuth,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10
  });

  return { data, isPending, isError, error, isSuccess };
};
