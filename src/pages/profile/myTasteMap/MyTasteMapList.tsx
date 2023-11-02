import React from "react";
import { MapInfoList, NoDataWrapper } from "./myTasteMap.styles";
import { ISearchMapData } from "../../../api/apiType";
import MyTasteMapItem from "./MyTasteMapItem";
import NoData from "../../../component/commons/noData/NoData";

interface IProps {
  items: ISearchMapData[];
  isShareTasteMap: boolean;
}
export default function myTasteMapList({ items, isShareTasteMap }: IProps) {
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
              />
            );
          })}
        </MapInfoList>
      )}
    </>
  );
}
