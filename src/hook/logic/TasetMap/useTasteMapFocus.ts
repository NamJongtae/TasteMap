import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { EMapContentType, tasteMapSlice } from "../../../slice/tasteMapSlice";
import { IMapData } from "../../../api/apiType";

interface IProps {
  mapData: IMapData;
}
export const useTasteMapFocus = ({ mapData }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const focusMapeHandler = () => {
    dispatch(tasteMapSlice.actions.setClickMarkerData(mapData));
    dispatch(tasteMapSlice.actions.setContentType(EMapContentType.MAP));
  };

  return { focusMapeHandler };
};
