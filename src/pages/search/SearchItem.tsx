import React from "react";
import { IMyProfileData, IUserProfileData } from "../../api/apiType";
import {
  FollowBtn,
  SearchLi,
  UserImg,
  UserProfileLink,
  Username
} from "./search.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useFollowMutation } from "../../hook/query/profile/useFollowMutation";
import { useUnfollowMutation } from "../../hook/query/profile/useUnfollowMutation";
import { useSupportedWebp } from '../../hook/useSupportedWebp';

interface IProps {
  item: IUserProfileData;
  myProfile: IMyProfileData | undefined;
}
export default function SearchItem({ item, myProfile }: IProps) {
  const { resolveWebp } = useSupportedWebp();
  const searchKeyword = useSelector(
    (state: RootState) => state.search.searchKeyword
  );

  const { mutate: followMuate } = useFollowMutation();
  const { mutate: unfollowMuate } = useUnfollowMutation();

  const isFollow = myProfile!.followingList.includes(item.uid);

  const onClickFollow = () => {
    followMuate({ myUid: myProfile!.uid, userUid: item.uid });
  };

  const onClickUnFollow = () => {
    unfollowMuate({ myUid: myProfile!.uid, userUid: item.uid });
  };

  // 검색 텍스트 하이라이트 효과
  const textHighLight = (text: string) => {
    // 검색 키워드를 기준으로 문자열이 나눔
    const parts = text.split(new RegExp(`(${searchKeyword})`, "gi"));

    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part.toLowerCase() === searchKeyword.toLowerCase() ? (
              // 검색 키워드와 일치하는 부분을 파란색으로 강조
              <span style={{ color: "#208afa" }}>{part}</span>
            ) : (
              // 검색 키워드와 일치하지 않는 부분은 그대로 표시
              part
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  const isMe = item.uid === myProfile?.uid;

  return (
    <SearchLi key={item.uid}>
      <UserProfileLink to={`/profile/${item.uid}`}>
        <UserImg
          src={item.photoURL}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
            (e.currentTarget.src = resolveWebp(
              "/assets/webp/icon-defaultProfile.webp",
              "svg"
            ))
          }
        />
        <Username>{textHighLight(item.displayName || "")}</Username>
      </UserProfileLink>
      {!isMe && (
        <FollowBtn
          isFollow={isFollow}
          onClick={isFollow ? onClickUnFollow : onClickFollow}
        >
          {isFollow ? "언팔로우" : "팔로우"}
        </FollowBtn>
      )}
    </SearchLi>
  );
}
