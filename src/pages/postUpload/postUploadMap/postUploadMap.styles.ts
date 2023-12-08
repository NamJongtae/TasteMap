import styled from 'styled-components';

export const MapSection = styled.section`
  margin-bottom: 20px;
`;

export const MapTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  display: block;
  margin-bottom: 15px;
`;

export const SearchModalBtn = styled.button`
  font-size: 14px;
  font-weight: 500;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-search.webp"
        : "/assets/icon-search.svg"
    }) no-repeat center right 7px / 16px gold`};
  border-radius: 5px;
  padding: 8px 30px 8px 14px;
  margin-bottom: 20px;
`;