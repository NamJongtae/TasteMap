import React from "react";
import { SearchForm, SearchInput, SearchLabel, SearchLi, SearchUl, Wrapper, FollowBtn } from "./search.styles";
import Header from "../../commons/layouts/header/Header";
import UserInfo from '../post/UserInfo.container';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';


export default function Search() {
  const userData = useSelector((state: RootState)=>state.user.data);
  return (
    <>
      <Header type='search' />
      <Wrapper>
        <SearchForm>
          <SearchLabel className='a11y-hidden'>계정검색</SearchLabel>
          <SearchInput placeholder='계정 검색' />
        </SearchForm>
        <SearchUl>
          <SearchLi>
            <UserInfo userData={userData} activeMoreBtn={false} isProfilePage={false}/>
            <FollowBtn>팔로우</FollowBtn>
          </SearchLi>
          <SearchLi>
            <UserInfo userData={userData} activeMoreBtn={false} isProfilePage={false}/>
            <FollowBtn>팔로우</FollowBtn>
          </SearchLi>
          <SearchLi>
            <UserInfo userData={userData} activeMoreBtn={false} isProfilePage={false}/>
            <FollowBtn>팔로우</FollowBtn>
          </SearchLi>
        </SearchUl>
      </Wrapper>
    </>
  );
}
