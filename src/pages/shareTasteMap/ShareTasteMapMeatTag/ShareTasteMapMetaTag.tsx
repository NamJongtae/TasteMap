import React from "react";
import { Helmet } from "react-helmet-async";
import { IUserProfileData } from "../../../types/apiTypes";

interface IProps {
  userProfile: IUserProfileData | undefined;
}
export default function ShareTasteMapMetaTag({ userProfile }: IProps) {
  return (
    <Helmet>
      <meta
        property='og:title'
        content={userProfile?.displayName + "님의 TasteMap"}
      />
      <meta property='og:type' content='webpsite' />
      <meta
        property='og:url'
        content={"https://tasteMap.site/tasteMap/share" + userProfile!.uid}
      />
      <meta
        property='og:image'
        content='https://firebasestorage.googleapis.com/v0/b/tastemap-c9a2a.appspot.com/o/images%2Fog%2Fog-img.png?alt=media&token=d4503b8e-af9e-4d6b-9367-268973d3104d&_gl=1*179wgyn*_ga*MTY1NzkxNDYxOC4xNjg4NTU5ODMy*_ga_CW55HF8NVT*MTY5NjQyMTkyOS4yMDEuMS4xNjk2NDIxOTcyLjE3LjAuMA..'
      />
      <meta
        property='og:description'
        content={
          (userProfile?.displayName || "") + "님이 공유하는 나만의 맛집 지도"
        }
        data-react-helmet='true'
      />
    </Helmet>
  );
}
