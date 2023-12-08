import { useCallback, useEffect } from "react";
import { IPostData } from "../../../api/apiType";
import { tasteMapSlice } from "../../../slice/tasteMapSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { searchSlice } from "../../../slice/searchSlice";

interface IProps {
  isEdit: boolean;
  post: IPostData | undefined;
}

export const usePostUploadMap = ({ isEdit, post }: IProps) => {
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
    setUpdateInitalValue();
  }, [post]);

  return {
    searchSelectedMap,
    isOpenSearchMapModal,
    openSearchModal
  };
};
