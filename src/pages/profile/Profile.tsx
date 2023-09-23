import React from "react";
import { Wrapper } from "./profile.styles";
import ProfileInfo from "./ProfileInfo";
import ProfilePost from "./ProfilePost";
import Header from "../../compoent/commons/layouts/header/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Loading from "../../compoent/commons/loading/Loading";

export default function Profile() {
  const isLoading = useSelector((state: RootState) => state.profile.isLoading);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <Header type='profile' />
          <ProfileInfo />
          <ProfilePost />
        </Wrapper>
      )}
    </>
  );
}
