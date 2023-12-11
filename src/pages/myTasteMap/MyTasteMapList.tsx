import React from "react";
import { MapInfoList, NoDataWrapper } from "./myTasteMap.styles";
import { IMapData, IMyProfileData, IUserProfileData } from "../../api/apiType";
import MyTasteMapItem from "./MyTasteMapItem";
import NoData from "../../component/commons/noData/NoData";

interface IProps {
  items: IMapData[];
  isShareTasteMap: boolean;
  profile: IMyProfileData | IUserProfileData;
}
export default function myTasteMapList({
  items,
  isShareTasteMap,
  profile
}: IProps) {
  return (
    <>
      {items.length === 0 ? (
        <NoDataWrapper>
          <NoData />
        </NoDataWrapper>
      ) : (
        <MapInfoList isShareTasteMap={isShareTasteMap}>
          {items.map((item) => {
            return (
              <MyTasteMapItem
                key={item.address}
                item={item}
                isShareTasteMap={isShareTasteMap}
                profile={profile}
              />
            );
          })}
        </MapInfoList>
      )}
    </>
  );
}
