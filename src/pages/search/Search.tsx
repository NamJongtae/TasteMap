import React from "react";
import { Wrapper } from "./search.styles";
import Header from "../../component/commons/layouts/header/Header";
import SearchInput from "./searchInput/SearchInput";
import TopButton from "../../component/commons/topButton/TopButton";
import Loading from "../../component/commons/loading/Loading";
import { useLoadMyProfile } from "../../hook/useLoadMyProfile";
import { IMyProfileData } from "../../api/apiType";
import SearchResultList from "./searchResultList/SearchResultList";

export default function Search() {
  const { myProfile, loadMyProfileLoading, myProfileIsError } =
    useLoadMyProfile();

  if (loadMyProfileLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header type='search' />
      <Wrapper>
        <h2 className='a11y-hidden'>계정 검색</h2>
        <SearchInput />
        {myProfileIsError ? null : (
          <SearchResultList myProfile={myProfile || ({} as IMyProfileData)} />
        )}
      </Wrapper>
      <TopButton />
    </>
  );
}
