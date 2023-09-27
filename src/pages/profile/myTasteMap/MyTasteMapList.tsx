import React from "react";
import { MapInfoList } from "./myTasteMap.styles";
import { ISearchMapData } from "../../../api/apiType";
import MyTasteMapItem from "./MyTasteMapItem";

interface IProps {
  items: ISearchMapData[];
}
export default function myTasteMapList({ items }: IProps) {
  return (
    <MapInfoList>
      {items.map((item) => {
        return (
          <MyTasteMapItem
            key={item.address}
            item={item}
          />
        );
      })}
    </MapInfoList>
  );
}
