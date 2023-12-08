import { useSelector } from "react-redux";
import { IPostData } from "../../../api/apiType";
import { RootState } from "../../../store/store";

interface IProps {
  isEdit: boolean;
  post: IPostData | undefined;
}
export const useSubmitBtnController = ({ isEdit, post }: IProps) => {
  const searchSelectedMap = useSelector(
    (state: RootState) => state.tasteMap.searchSelectedMap
  );
  const isDisabled = (
    contentValue: string,
    preview: string[],
    ratingValue: number
  ) => {
    return isEdit
      ? contentValue === "" ||
          (post?.content === contentValue &&
            post?.imgURL === preview &&
            post?.rating === ratingValue &&
            post?.mapData.address === searchSelectedMap.address)
      : !contentValue || !searchSelectedMap.mapx || !ratingValue;
  };

  return { isDisabled };
};
