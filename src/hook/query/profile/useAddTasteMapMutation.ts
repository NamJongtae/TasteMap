import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTasteMap } from "../../../api/firebase/postAPI";
import { IMyProfileData, IMapData } from "../../../api/apiType";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";

export const useAddTasteMapMutation = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (mapData: IMapData) => addTasteMap(mapData),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["profile", "my"] });
      const previousProfile = await queryClient.getQueryData(["profile", "my"]);
      queryClient.setQueryData(
        ["profile", "my"],
        (myProfile: IMyProfileData) => ({
          ...myProfile,
          storedMapList: [...myProfile.storedMapList, data]
        })
      );

      return { previousProfile };
    },
    onError: (error, data, ctx) => {
      if (ctx) {
        queryClient.setQueryData(["profile", "my"], ctx.previousProfile);
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", "my"] });
    }
  });

  return { mutate };
};
