import { useMutation } from "@tanstack/react-query";
import { fetchFindEmail } from "../../../api/firebase/findAccountAPI";

export const useFindAccountMutation = () => {
  const { mutate, isPending, data, reset, error } = useMutation({
    mutationFn: ({
      displayName,
      phone
    }: {
      displayName: string;
      phone: string;
    }) => fetchFindEmail(displayName, phone),
  });

  return { mutate, isPending, data, reset, error };
};
