import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { postSlice, thuckFetchSearchMap } from "../../slice/postSlice";
import { ISearchMapData } from "../../api/apiType";
import { sweetToast } from "../../library/sweetAlert/sweetAlert";

interface IProps {
  closeSearchModal: () => void;
}

export default function SearchModal({ closeSearchModal }: IProps) {
  // 맛집 검색 데이터 가져오기
  const searchMapData = useSelector(
    (state: RootState) => state.post.searchMapData
  );
  const dispatch = useDispatch<AppDispatch>();
  // 검색어
  const [inputValue, setInputValue] = useState("");
  // 검색을 했는지 초기상태를 체크 초기 툴팁을 표시하기위해
  const [isSarch, setIsSearch] = useState(false);
  // 검색어를 저장 검색결과가 없을 시 해당 검색어를 표시하기 위해
  const [searchKeyword, setSearchKeyword] = useState("");
  /**
   * 검색어 change 함수 */
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === " " && e.target.value.length === 1) return;
    setInputValue(e.currentTarget.value);
  };

  /**
   * 맛집 검색 함수 */
  const onSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 검색어가 없는 경우 return 처리
    if (!inputValue) return sweetToast("검색어를 입력해주세요.", "warning");
    // redux thuck를 이용해 비동기 처리 서버로 부터 검색한 내용을 받아옴
    await dispatch(thuckFetchSearchMap(inputValue));
    setSearchKeyword(inputValue);
    setIsSearch(true);
  };

  /**
   * 맛집 검색 데이터 선택 함수 */
  const onClickSelected = (item: ISearchMapData) => {
    // selectedMapData 상태 업데이트
    dispatch(postSlice.actions.setSelectedMapData(item));
    // searchMapData 상태 리셋
    dispatch(postSlice.actions.resetSearchMapData());
    // 검색 input값 초기화
    setInputValue("");
    // 모달 창 닫기
    closeSearchModal();
  };

  return (
    <Wrapper>
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
          />
        </SearchInputForm>
        {isSarch ? (
          searchMapData.length > 0 ? (
            <SearchList>
              {searchMapData.map((item) => {
                return (
                  <SearchItem key={item.title}>
                    <ItemList>
                      <Item>
                        <SearchItemTag>가게명</SearchItemTag>
                        <SearchItemText>{item.title}</SearchItemText>
                      </Item>
                      <Item>
                        <SearchItemTag>도로명 </SearchItemTag>
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

        <CloseBtn type='button' onClick={closeSearchModal} />
      </Modal>
    </Wrapper>
  );
}
