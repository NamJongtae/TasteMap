import React from "react";
import { Wrapper } from "./search.styles";
import Header from "../../commons/layouts/header/Header";
import SearchInput from "./SearchInput";
import SearchList from './SearchList';
import TopButton from '../../commons/topButton/TopButton';

export default function Search() {
  return (
    <>
      <Header type='search' />
      <Wrapper>
        <h2 className='a11y-hidden'>계정 검색</h2>
        <SearchInput />
        <SearchList />
      </Wrapper>
      <TopButton/>
    </>
  );
}
