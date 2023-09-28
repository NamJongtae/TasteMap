import React from "react";
import { NoDataImg, Title, Wrapper } from "./noData.styles";
import { resolveWebp } from "../../../library/webpSupport";

export default function NoData() {
  return (
    <Wrapper>
      <NoDataImg src={resolveWebp("/assets/webp/icon-noData.webp", "svg")} />
      <Title>No Data</Title>
    </Wrapper>
  );
}
