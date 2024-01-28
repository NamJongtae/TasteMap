import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { tasteMapSlice } from "../../../slice/tasteMapSlice";
import { IMapData } from "../../../types/apiTypes";
import { EMapContentType } from "../../../types/types";

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
