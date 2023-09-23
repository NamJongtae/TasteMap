import { Link } from "react-router-dom";
import styled from "styled-components";

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
export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 10px;
`;

export const UserProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const FollowerLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 18px;
`;

export const FollowerTag = styled.span`
  font-weight: 400;
  font-size: 12px;
`;

export const FollowerCount = styled.span``;

export const FollowingLink = styled(FollowerLink)`
  color: #767676;
`;

export const FollowingCount = styled(FollowerCount)``;

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

export const Introduce = styled.p`
  margin-bottom: 20px;
  white-space: nowrap;
  word-break: break-all;
  line-height: 1.5;
  max-width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 500;
  color: #767676;
`;

export const ButtonWrapper = styled.div``;
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
`;
export const ProfileFollowBtn = styled(ProfileBtn)`
  background-color: ${(props: {isFollow:boolean})=>props.isFollow ? "#fff":"#208AFA"};
  color: ${(props: {isFollow:boolean})=>props.isFollow ? "#767676" : "#fff"}
`;
