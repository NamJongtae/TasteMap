import React from "react";
import {
  Wrapper,
  Dim,
  Modal,
  SearchInput,
  ModalTitleBar,
  ModalTitle,
  CloseBtn,
  SearchList,
  SearchItem,
  Item,
  SearchItemTag,
  ItemList,
  SelectBtn,
  SearchItemText,
  SearchInputForm,
  SerachTip,
  TipTitle,
  TipDescription,
  TipExample,
  NoSearchData,
  NoSearchDataText,
  Strong
} from "./searchModal.styles";
import { SweetAlertResult } from "sweetalert2";
import { ISearchMapData } from "../../api/apiType";
import { optModalTabFocus } from "../../library/optModalTabFocus";
interface IProps {
  closeSearchModal: () => void;
  onSubmitSearch: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<SweetAlertResult<any> | undefined>;
  inputValue: string;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  lastItemSelectBtn: React.RefObject<HTMLButtonElement>;
  isSarch: boolean;
  searchMapData: ISearchMapData[];
  onClickSelected: (item: ISearchMapData) => void;
  searchKeyword: string;
}
export default function SearchModalUI({
  closeSearchModal,
  onSubmitSearch,
  inputValue,
  onChangeValue,
  inputRef,
  closeBtnRef,
  lastItemSelectBtn,
  isSarch,
  searchMapData,
  onClickSelected,
  searchKeyword
}: IProps) {
  return (
    <Wrapper
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 27) {
          closeSearchModal();
        }
      }}
    >
      <Dim onClick={closeSearchModal}></Dim>
      <Modal>
        <ModalTitleBar>
          <ModalTitle>맛집 검색</ModalTitle>
        </ModalTitleBar>
        <SearchInputForm onSubmit={onSubmitSearch}>
          <SearchInput
            type='text'
            value={inputValue}
            onChange={onChangeValue}
            placeholder='가게명, 상호명 검색'
            ref={inputRef}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              optModalTabFocus(e, closeBtnRef.current);
            }}
          />
        </SearchInputForm>
        {isSarch ? (
          searchMapData.length > 0 ? (
            <SearchList>
              {searchMapData.map((item, idx) => {
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
                      onClick={() => onClickSelected(item)}
                      ref={
                        idx === searchMapData.length - 1
                          ? lastItemSelectBtn
                          : null
                      }
                    >
                      선택
                    </SelectBtn>
                  </SearchItem>
                );
              })}
            </SearchList>
          ) : (
            <NoSearchData>
              <NoSearchDataText>
                <Strong>{searchKeyword}</Strong>
                {` 와 일치하는 검색결과가 없습니다.
                검색어에 잘못된 부분이 있는지 확인해주세요.
                가게명, 상호명, 지역명을 다시 한번 확인해주세요.`}
              </NoSearchDataText>

              <NoSearchDataText>
                Tip &#41; 검색이 잘 안되시나요? 아래와 같이 검색해보세요.
              </NoSearchDataText>
              <NoSearchDataText>가게명 + 지역명</NoSearchDataText>
              <TipExample>예&#41; 나만의 맛집 + 서울 강남</TipExample>
            </NoSearchData>
          )
        ) : (
          <SerachTip>
            <TipTitle>tip</TipTitle>
            <TipDescription>
              아래와 같이 검색을 하시면 정확한 결과가 검색됩니다.
            </TipDescription>
            <TipDescription>가게명 + 지역명</TipDescription>
            <TipExample>예&#41; 나만의맛집 + 서울 강남</TipExample>
          </SerachTip>
        )}

        <CloseBtn
          type='button'
          onClick={closeSearchModal}
          ref={closeBtnRef}
          onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
            optModalTabFocus(
              e,
              lastItemSelectBtn.current || inputRef.current,
              inputRef.current
            );
          }}
        />
      </Modal>
    </Wrapper>
  );
}
