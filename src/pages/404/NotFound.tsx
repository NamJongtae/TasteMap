import React from "react";
import {
  NotFoundImg,
  Wrapper,
  BackBtn,
  NotFoundContent
} from "./notFound.styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { resolveWebp } from '../../library/resolveWebp';

export default function NotFound() {
  const isWebpSupported = useSelector((state: RootState) => state.setting.isWebpSupported);
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h2 className='a11y-hidden'>404 Error</h2>
      <NotFoundContent>
        <NotFoundImg src={resolveWebp("/assets/webp/icon-404.webp", "svg")} />
        <BackBtn
          onClick={() => navigate("../", { replace: true })}
          $isWebpSupported={isWebpSupported}
        />
      </NotFoundContent>
    </Wrapper>
  );
}
