import { IMapData } from "../../../../../../../types/apiTypes";
import { SearchList } from "../../../../searchMapModal.styles";
import SearchMapResultItem from "./searchMapResultItem/SearchMapResultItem";

interface IProps {
  data: IMapData[] | undefined;
  lastResultSelectBtnRef: React.RefObject<HTMLButtonElement>;
  isTasteMapPage: boolean;
}

export const SearchMapResultList = ({
  data,
  lastResultSelectBtnRef,
  isTasteMapPage
}: IProps) => {
  return (
    <SearchList>
      {data?.map((item, idx) => {
        return (
          <SearchMapResultItem
            key={item.address || "" + idx}
            isTasteMapPage={isTasteMapPage}
            data={item}
            isLastSelectBtn={idx === data.length - 1}
            lastResultSelectBtnRef={lastResultSelectBtnRef}
          />
        );
      })}
    </SearchList>
  );
};
