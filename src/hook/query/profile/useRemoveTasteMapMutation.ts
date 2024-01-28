import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeTasteMap } from "../../../api/firebase/postAPI";
import { IMyProfileData, IMapData } from "../../../types/apiTypes";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { My_PROFILE_QUERYKEY } from "../../../querykey/querykey";

export const useRemoveTasteMapMutation = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (mapData: IMapData) => removeTasteMap(mapData),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: My_PROFILE_QUERYKEY });
      const previousProfile = queryClient.getQueryData(My_PROFILE_QUERYKEY);
      queryClient.setQueryData(
        My_PROFILE_QUERYKEY,
        (myProfile: IMyProfileData) => ({
          ...myProfile,
          storedMapList: myProfile.storedMapList.filter(
            (map) => map.mapx !== data.mapx && map.mapy !== data.mapy
          )
        })
      );

      return { previousProfile };
    },
    onSuccess: () => {
      sweetToast("나의 맛집 지도에 맛집이 삭제되었습니다", "success");
    },
    onError: (error, data, ctx) => {
      if (ctx) {
        queryClient.setQueryData(My_PROFILE_QUERYKEY, ctx.previousProfile);
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: My_PROFILE_QUERYKEY });
    }
  });

  return { mutate };
};
