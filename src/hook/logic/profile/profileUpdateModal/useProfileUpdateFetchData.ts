import { useUpdateProfileMutation } from "../../../query/profile/useUpdateProfileMutation";

export const useProfileUpdateFetchData = () => {
  const { mutate: updateProfileMutate, isPending: updateUserProfileLoading } =
    useUpdateProfileMutation();

  const updateProfileHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const displayName = formData.get("nickname") as string;
    const uploadImg = formData.get("uploadImg") as File;
    const introduce = formData.get("introduce") as string;

    const IProfileUpdateData = {
      displayName: displayName.toLowerCase(),
      file: uploadImg.name ? uploadImg : "",
      introduce: introduce
    };
    updateProfileMutate(IProfileUpdateData);
  };

  return { updateProfileHandler, updateUserProfileLoading };
};
