import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

export const Dim = styled.div`
  width: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  inset: 0;
  z-index: 999;
`;

export const ModalTitleBar = styled.div`
  padding: 12px;
  border-bottom: 1px solid #bdbdbd;
`;

export const ModalTitle = styled.h2`
  position: relative;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 30px;
  height: 30px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-back.webp"
        : "/assets/icon-back.svg"
    }) no-repeat center / 16px`};
  transform: rotate(180deg);
`;

export const FollowModalWrapper = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  max-width: 500px;
  min-height: 300px;
  background-color: #fff;
  z-index: 999;
  animation: FollowModalmoveUp 1s;
  @keyframes FollowModalmoveUp {
    from {
      transform: translate(-50%, 100%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }

  @keyframes FollowModalmoveDown {
    from {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    to {
      transform: translate(-50%, 80%);
      opacity: 0;
    }
  }
`;

export const FollowUl = styled.ul`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 20px;
  li:last-child {
    padding-bottom: 20px;
  }
`;

export const FollowLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 300px;
  margin: 0 auto 20px auto;
`;

export const UserLink = styled(Link)``;

export const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f5f5f5;
  padding: 3px;
  vertical-align: middle;
  margin-right: 10px;
`;

export const UserName = styled.strong``;

export const FollowBtn = styled.button`
  width: 77px;
  border-radius: 20px;
  border: 1px solid #bdbdbd;
  padding: 7px 16px;
  font-size: 12px;
  border: none;
  color: ${(props: { isFollow: boolean }) =>
    props.isFollow ? "#767676" : "#fff"};
  background-color: ${(props: { isFollow: boolean }) =>
    props.isFollow ? "" : "#208AFA"};
`;

export const InfinityScrollTarget = styled.li`
  position: relative;
  bottom: 21px;
`;
