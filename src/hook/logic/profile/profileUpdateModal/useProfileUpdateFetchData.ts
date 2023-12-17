import { useUpdateProfileMutation } from "../../../query/profile/useUpdateProfileMutation";
import { FieldValues } from "react-hook-form";

export const useProfileUpdateFetchData = () => {
  const { mutate: updateProfileMutate, isPending: updateUserProfileLoading } =
    useUpdateProfileMutation();

  const updateProfileHandler = async (data: FieldValues) => {
    const IProfileUpdateData = {
      displayName: data.displayName.toLowerCase(),
      file: data.img,
      introduce: data.introduce
    };
    updateProfileMutate(IProfileUpdateData);
  };

  return { updateProfileHandler, updateUserProfileLoading };
};
