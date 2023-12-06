import { useSelector } from 'react-redux';
import { IMapData } from '../../api/apiType';
import Kakaomap from "../../component/units/kakaomap/Kakaomap";
import { SearchModalBtn, Section, SectionTitle } from "./postUpload.styles";
import { RootState } from '../../store/store';

interface IProps {
  openSearchModal: ()=>void;
  searchSelectedMap: IMapData;
}
export const PostUploadMap = ({
  openSearchModal,
  searchSelectedMap
}: IProps) => {
  const isWebpSupported = useSelector((state: RootState) => state.setting.isWebpSupported);
  return (
    <Section>
      <SectionTitle>맛집 선택*</SectionTitle>
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
    </Section>
  );
};
