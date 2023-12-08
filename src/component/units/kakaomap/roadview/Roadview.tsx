import React from "react";
import { RoadviewWrapper, RoadviewMap } from "./roadview.styles";

interface IProps {
  rvWrapperRef: React.RefObject<HTMLDivElement>;
  roadviewRef: React.RefObject<HTMLDivElement>;
}

export default function Roadview({ rvWrapperRef, roadviewRef }: IProps) {
  return (
    <RoadviewWrapper ref={rvWrapperRef}>
      <RoadviewMap ref={roadviewRef}></RoadviewMap>
    </RoadviewWrapper>
  );
}
