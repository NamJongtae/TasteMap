import React from "react";
import { Wrapper } from "./search.styles";
import Header from "../../component/commons/layouts/header/Header";
import SearchInput from "./SearchInput";
import SearchList from "./SearchList";
import TopButton from "../../component/commons/topButton/TopButton";

export default function Search() {
  return (
    <>
      <Header type='search' />
      <Wrapper>
        <h2 className='a11y-hidden'>계정 검색</h2>
        <SearchInput />
        <SearchList />
      </Wrapper>
      <TopButton />
    </>
  );
}
