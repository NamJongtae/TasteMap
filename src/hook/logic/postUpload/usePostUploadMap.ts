import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { searchSlice } from "../../../slice/searchSlice";
import { useFormContext } from "react-hook-form";
import { IMapData, IPostData } from "../../../api/apiType";
import { tasteMapSlice } from "../../../slice/tasteMapSlice";

interface IProps {
  isEdit: boolean;
  post: IPostData | undefined;
}

export const usePostUploadMap = ({ isEdit, post }: IProps) => {
  const { setValue } = useFormContext();
  const isOpenSearchMapModal = useSelector(
    (state: RootState) => state.search.isOpenSearchMapModal
  );
  const dispatch = useDispatch<AppDispatch>();
  const searchSelectedMap = useSelector(
    (state: RootState) => state.tasteMap.searchSelectedMap
  );

  /**
   * 검색 모달창 열기 */
  const openSearchModal = useCallback(() => {
    dispatch(searchSlice.actions.setIsOpenSearchMapModal(true));
  }, []);

  /**
   * 게시물 수정시 기존 초기값 설정 */
  const setUpdateInitalValue = () => {
    if (isEdit && post?.id) {
      dispatch(tasteMapSlice.actions.setSearchSelectedMap(post.mapData));
    }
  };

  useEffect(() => {
    setValue("map", searchSelectedMap, { shouldDirty: true });
  }, [searchSelectedMap]);

  useEffect(() => {
    setUpdateInitalValue();
  }, [post]);
  
  useEffect(() => {
    return () => {
      dispatch(tasteMapSlice.actions.setSearchSelectedMap({} as IMapData));
    };
  }, []);

  return {
    searchSelectedMap,
    isOpenSearchMapModal,
    openSearchModal
  };
};
