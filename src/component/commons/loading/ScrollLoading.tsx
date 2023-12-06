import React from "react";
import { LoadingWrpper, LoadingImg } from './ScrollLoading.styles';

export default function ScrollLoading() {
  return (
    <LoadingWrpper>
      <LoadingImg src='/assets/scrollSpinner.gif' />
    </LoadingWrpper>
  );
}
