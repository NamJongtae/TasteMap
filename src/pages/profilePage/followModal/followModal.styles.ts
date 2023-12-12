import styled from "styled-components";

// -------------------FollowModal style-------------------

export const FollowModalWrapper = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 900px;
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

// -------------------FollowList style-------------------

export const FollowUl = styled.ul`
  width: 100%;
  height: calc(100% - 41px);
  overflow-y: scroll;
  padding: 20px;
`;

export const InfinityScrollTarget = styled.li`
  position: relative;
  bottom: 21px;
`;

// -------------------FollowItem style-------------------

export const FollowLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 300px;
  margin: 0 auto 20px auto;
`;

// -------------------FollowBtn style-------------------

export const StyledFollowBtn = styled.button`
  width: 77px;
  border-radius: 20px;
  border: 1px solid #bdbdbd;
  padding: 7px 16px;
  font-size: 12px;
  border: none;
  color: #fff;
  background-color: #208afa;
`;

// -------------------UnfollowBtn style-------------------

export const StyledUnfollowBtn = styled(StyledFollowBtn)`
  color: #767676;
  background-color: #f0f0f0;
`;
