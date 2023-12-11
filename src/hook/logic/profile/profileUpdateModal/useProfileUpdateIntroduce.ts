import { IMyProfileData } from "../../../../api/apiType";
import { useTextarea } from "../../../useTextarea";

interface IProps {
  myProfile: IMyProfileData;
  introduceRef: React.RefObject<HTMLTextAreaElement>;
}
export const useProfileUpdateIntroduce = ({
  myProfile,
  introduceRef
}: IProps) => {
  const {
    value: introduceValue,
    onChangeValue: onChangeIntroduce,
    preventKeydownEnter
  } = useTextarea(myProfile.introduce, introduceRef, 30);

  return { introduceValue, onChangeIntroduce, preventKeydownEnter };
};
