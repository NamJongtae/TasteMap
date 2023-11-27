import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyProfile } from "../../../api/firebase/profileAPI";
import { IProfileUpdateData } from "../../../api/apiType";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";

export const useUpdateProfileMutation = (sucessCb: () => void) => {
  const queryClinet = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (updateProfileData: IProfileUpdateData) =>
      updateMyProfile(updateProfileData),
    onSuccess: ()=> {
      queryClinet.invalidateQueries({ queryKey: ["profile", "my"] });
      queryClinet.invalidateQueries({ queryKey: ["auth"] });
      sucessCb();
    },
    onError: (error) => {
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.log(error);
    }
  });

  return { mutate, isPending };
};
