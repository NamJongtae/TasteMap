import { IMapData } from "../../../../../api/apiType";
import {
  Item,
  ItemList,
  SearchItem,
  SearchItemTag,
  SearchItemText,
  SearchList,
  SelectBtn
} from "./searchResultList.styles";

interface IProps {
  data: IMapData[] | undefined;
  selectedResultMapHandler: (item: IMapData) => void;
  lastResultSelectBtnRef: React.RefObject<HTMLButtonElement>;
}
export const SearchResultList = ({
  data,
  selectedResultMapHandler,
  lastResultSelectBtnRef
}: IProps) => {
  return (
    <SearchList>
      {data?.map((item, idx) => {
        return (
          <SearchItem key={item.address || "" + idx}>
            <ItemList>
              <Item>
                <SearchItemTag>가게명</SearchItemTag>
                <SearchItemText>{item.title}</SearchItemText>
              </Item>
              <Item>
                <SearchItemTag>도로명 주소</SearchItemTag>
                <SearchItemText>{item.roadAddress}</SearchItemText>
              </Item>
              <Item>
                <SearchItemTag>지번 주소</SearchItemTag>
                <SearchItemText>{item.address}</SearchItemText>
              </Item>
              <Item>
                <SearchItemTag>카테고리</SearchItemTag>
                <SearchItemText>{item.category}</SearchItemText>
              </Item>
              <Item>
                <SearchItemTag>홈페이지</SearchItemTag>
                <SearchItemText>{item.link}</SearchItemText>
              </Item>
            </ItemList>
            <SelectBtn
              type='button'
              onClick={() => selectedResultMapHandler(item)}
              ref={idx === data.length - 1 ? lastResultSelectBtnRef : null}
            >
              선택
            </SelectBtn>
          </SearchItem>
        );
      })}
    </SearchList>
  );
};
