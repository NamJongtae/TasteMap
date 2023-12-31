import { isMobile } from "react-device-detect";
import styled from "styled-components";

// -------------------ProfileInfo style-------------------

export const ProfileInfoWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 100%;
  padding: 30px 0;
  margin-bottom: 6px;
  border-bottom: 0.5px solid #bdbdbd;
`;

// -------------------ProfileUserInfo style-------------------

export const UserImgAndFollowInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 10px;
`;

export const UserProfileImg = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: #f5f5f5;
  padding: 3px;
  vertical-align: top;
`;

export const UserName = styled.strong`
  margin-bottom: 10px;
`;

// -------------------FollowerModalBtn style-------------------

export const FollowerBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  font-weight: 700;
  font-size: 18px;
  background: none;
`;

export const FollowerTag = styled.span`
  font-weight: 400;
  font-size: 12px;
`;

export const FollowerCount = styled.span`
  font-size: 16px;
`;

// -------------------FollowingModalBtn style-------------------

export const FollowingBtn = styled(FollowerBtn)`
  color: #767676;
`;

export const FollowingTag = styled(FollowerTag)``;

export const FollowingCount = styled(FollowerCount)``;

// -------------------Introduce style-------------------

export const Introduce = styled.p`
  margin-bottom: ${(props: { isShowMoreTextBtn: boolean }) =>
    props.isShowMoreTextBtn ? "10px" : "20px"};
  line-height: 1.5;
  max-width: 300px;
  font-size: 14px;
  font-weight: 500;
  color: #767676;
  white-space: pre-wrap;
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

export const IntroduceTextLine = styled.div`
  width: calc(100% - 32px);
  max-width: 300px;
  margin: 0 auto 10px auto;
  height: 1px;
  border-bottom: 1px solid #bdbdbd;
`;

export const MoreTextBtn = styled.button`
  display: block;
  background: ${(props: { $isWebpSupported: boolean | null }) => `url(${
    props.$isWebpSupported
      ? "/assets/webp/icon-moreTextBtn.webp"
      : "/assets/icon-moreTextBtn.svg"
  }) no-repeat right 2px top 7px /
      9px`};
  padding-right: 16px;
  margin-bottom: 10px;
  font-weight: 500;
`;

// -------------------ProfileInfoBtns style-------------------

export const ButtonWrapper = styled.div``;

// -------------------ProfileTasteMapBtn, ProfileUpdateModalBtn style-------------------

export const ProfileBtn = styled.button`
  background: none;
  border: 1px solid #bdbdbd;
  width: 110px;
  padding: 6px 0px;
  border-radius: 20px;
  margin-right: 10px;
  font-size: 14px;
  font-weight: 400;
  color: #767676;
  :hover {
    background-color: ${isMobile ? "" : "#208AFA"};
    color: ${isMobile ? "" : "#fff"};
    transition: all 0.3s;
  }
`;

// -------------------ProfileFollowBtn style-------------------

export const FollowBtn = styled.button`
  background: none;
  border: 1px solid #bdbdbd;
  width: 110px;
  padding: 6px 0px;
  border-radius: 20px;
  margin-right: 10px;
  font-size: 14px;
  font-weight: 400;
  color: #767676;
  :hover {
    background-color: ${isMobile ? "" : "#208AFA"};
    color: ${isMobile ? "" : "#fff"};
    transition: all 0.3s;
  }
`;

// -------------------ProfileUnfollowBtn style-------------------

export const UnfollowBtn = styled(FollowBtn)`
  :hover {
    background-color: ${isMobile ? "" : "coral"};
  }
`;
