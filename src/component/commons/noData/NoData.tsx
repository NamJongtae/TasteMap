import React from "react";
import { NoDataImg, Title, Wrapper } from "./noData.styles";
import { useSupportedWebp } from '../../../hook/useSupportedWebp';

export default function NoData() {
  const { resolveWebp } = useSupportedWebp();
  return (
    <Wrapper>
      <NoDataImg src={resolveWebp("/assets/webp/icon-noData.webp", "svg")} />
      <Title>No Data</Title>
    </Wrapper>
  );
}
