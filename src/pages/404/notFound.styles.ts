import styled from "styled-components";

export const Wrapper = styled.main`
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
`;
export const NotFoundContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const NotFoundImg = styled.img`
  margin-bottom: 10px;
`;

export const BackBtn = styled.button`
  display: block;
  padding: 5px 20px;
  color: #fff;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-404BackBtn.webp"
        : "/assets/icon-404BackBtn.svg"
    }) no-repeat center`};
  border-radius: 20px;
  margin: 0 auto;
  width: 120px;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 1px 3px 5px 1px rgba(0, 0, 0, 0.2);
`;
