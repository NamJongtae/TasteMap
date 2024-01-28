import React from "react";
import { ListTypeMarkDataUl, NoDataWrapper } from "../../TasteMap.styles";
import { IMapData } from "../../../../../types/apiTypes";

import NoData from "../../../../../component/commons/noData/NoData";
import ListTypeMarkerDataItem from "./ListTypeMarkerDataItem/ListTypeMarkerDataItem";

interface IProps {
  items: IMapData[] | undefined;
  isSharePage: boolean;
}
export default function ListTypeMarkerData({ items, isSharePage }: IProps) {
  return (
    <>
      {items?.length === 0 ? (
        <NoDataWrapper isSharePage={isSharePage}>
          <NoData />
        </NoDataWrapper>
      ) : (
        <ListTypeMarkDataUl isSharePage={isSharePage}>
          {items?.map((item) => {
            return (
              <ListTypeMarkerDataItem
                key={item.address}
                item={item}
                isSharePage={isSharePage}
              />
            );
          })}
        </ListTypeMarkDataUl>
      )}
    </>
  );
}
