import { useMutation } from "@tanstack/react-query";
import { fetchChangePassword } from '../../../api/firebase/findAccountAPI';

export const useFindPasswordMuataion = () => {
  const { mutate, isPending, data, reset } = useMutation({
    mutationFn: ({ email, phone }: { email: string; phone: string }) =>
      fetchChangePassword(email, phone)
  });

  return { mutate, isPending, data, reset}
};
