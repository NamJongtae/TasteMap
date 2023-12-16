import React from "react";
import Header from "../../component/commons/layouts/header/Header";
import Loading from "../../component/commons/loading/Loading";
import { useLoadMyProfile } from "../../hook/useLoadMyProfile";
import TasteMap from './tasteMap/TasteMap';

export default function MyTasteMap() {
  const { myProfile, loadMyProfileLoading } = useLoadMyProfile();

  if (loadMyProfileLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header type='tasteMap' />
      <TasteMap profile={myProfile} isSharePage={false} />
    </>
  );
}
