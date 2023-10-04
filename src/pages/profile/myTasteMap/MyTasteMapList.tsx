import React from "react";
import { MapInfoList } from "./myTasteMap.styles";
import { ISearchMapData } from "../../../api/apiType";
import MyTasteMapItem from "./MyTasteMapItem";

interface IProps {
  items: ISearchMapData[];
  isShareTasteMap:boolean;
}
export default function myTasteMapList({ items, isShareTasteMap }: IProps) {
  return (
    <MapInfoList>
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
  );
}
