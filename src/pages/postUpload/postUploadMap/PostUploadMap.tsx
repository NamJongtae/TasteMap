import { useSelector } from "react-redux";
import { IMapData } from "../../../api/apiType";
import Kakaomap from "../../../component/units/kakaomap/Kakaomap";
import { RootState } from "../../../store/store";
import { MapSection, MapTitle, SearchModalBtn } from "./postUploadMap.styles";

interface IProps {
  openSearchModal: () => void;
  searchSelectedMap: IMapData;
}
export const PostUploadMap = ({
  openSearchModal,
  searchSelectedMap
}: IProps) => {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );
  return (
    <MapSection>
      <MapTitle>맛집 선택*</MapTitle>
      <SearchModalBtn
        onClick={openSearchModal}
        $isWebpSupported={isWebpSupported}
      >
        맛집 검색
      </SearchModalBtn>
      <Kakaomap
        items={searchSelectedMap.mapx ? [searchSelectedMap] : []}
        isTasteMapPage={false}
      />
    </MapSection>
  );
};
