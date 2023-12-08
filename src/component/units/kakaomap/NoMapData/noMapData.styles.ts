import styled from 'styled-components';
import { MapContainer } from '../kakaomap.styles';

export const NoMapDataWrapper = styled(MapContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  white-space: pre-wrap;
  text-align: center;
  line-height: 1.5;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-searchMap.webp"
        : "/assets/icon-searchMap.svg"
    }) no-repeat center 70px / 100px #f2f2f2`};
  @media screen and (max-width: 468px) {
    font-size: 14px;
  }
`;

export const Message = styled.p`
  padding-top: 100px;
`;