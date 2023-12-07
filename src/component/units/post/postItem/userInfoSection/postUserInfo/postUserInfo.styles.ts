import styled from 'styled-components';

export const MenuBtn = styled.button`
  width: 30px;
  height: 45px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-more.webp"
        : "/assets/icon-more.svg"
    }) no-repeat center / 15px`};
`;