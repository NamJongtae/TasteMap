import { useSelector } from "react-redux";
import Kakaomap from "../../../../../component/units/kakaomap/Kakaomap";
import { RootState } from "../../../../../store/store";
import {
  MapSection,
  MapTitle,
  SearchModalBtn
} from "../../../postUpload.styles";
import { usePostUploadMap } from "../../../../../hook/logic/postUpload/usePostUploadMap";
import { useFormContext } from "react-hook-form";
import { IPostData } from "../../../../../types/apiTypes";

interface IProps {
  isEdit: boolean;
  post: IPostData | undefined;
}

export const PostUploadMap = ({ isEdit, post }: IProps) => {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );
  const { searchSelectedMap, openSearchModal } = usePostUploadMap({
    isEdit,
    post
  });
  const { register } = useFormContext();

  return (
    <MapSection>
      <MapTitle>맛집 선택*</MapTitle>
      <SearchModalBtn
        type='button'
        onClick={openSearchModal}
        $isWebpSupported={isWebpSupported}
      >
        맛집 검색
      </SearchModalBtn>
      <Kakaomap
        items={searchSelectedMap.mapx ? [searchSelectedMap] : []}
        isTasteMapPage={false}
        isSharePage={false}
      />

      {/* form map data 전송을 위해 사용 */}
      <input
        type='hidden'
        {...(register("map"),
        {
          required: true
        })}
      />
    </MapSection>
  );
};
