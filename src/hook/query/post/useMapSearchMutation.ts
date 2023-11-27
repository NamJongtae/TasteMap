import { useMutation } from "@tanstack/react-query";
import { fetchMap } from "../../../api/naverSearchAPI/naverSearchAPI";

export const useMapSearchMutation = () => {
  const { mutate, data, isPending } = useMutation({
    mutationFn: (keyword: string) => fetchMap(keyword),
  });

  return { mutate, data, isPending }
};
