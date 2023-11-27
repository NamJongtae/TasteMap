import { useQuery } from "@tanstack/react-query";
import { fetchAuth } from "../../../api/firebase/authAPI";

export const useAuthQuery = () => {
  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: ["auth"],
    queryFn: fetchAuth,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10
  });

  return { data, isPending, isError, error, isSuccess };
};
