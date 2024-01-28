import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useParams } from "react-router-dom";
import { useUserProfileQuery } from "../../query/profile/useUserProfileQuery";
import { tasteMapSlice } from "../../../slice/tasteMapSlice";
import { EMapContentType } from "../../../types/types";

export const useShareTasteMap = () => {
  const { uid } = useParams();

  const myInfo = useSelector((state: RootState) => state.user.myInfo);

  const clickedMarkerData = useSelector(
    (state: RootState) => state.tasteMap.clickMarkerData
  );
  const contentType = useSelector(
    (state: RootState) => state.tasteMap.contentType
  );
  const dispatch = useDispatch<AppDispatch>();

  const { data: userProfile, isFetching: userIsFetching } = useUserProfileQuery(
    uid || ""
  );

  const activeMapTypeHandler = () => {
    dispatch(tasteMapSlice.actions.setContentType(EMapContentType.MAP));
  };

  const activeListTypeHandler = () => {
    dispatch(tasteMapSlice.actions.setContentType(EMapContentType.LIST));
  };

  const isInvalidMap = !userProfile?.storedMapList;

  return {
    myInfo,
    userProfile,
    userIsFetching,
    clickedMarkerData,
    contentType,
    activeMapTypeHandler,
    activeListTypeHandler,
    isInvalidMap
  };
};
