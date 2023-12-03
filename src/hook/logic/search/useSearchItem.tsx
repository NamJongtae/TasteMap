import { useSelector } from "react-redux";
import { useFollowMutation } from "../../query/profile/useFollowMutation";
import { useUnfollowMutation } from "../../query/profile/useUnfollowMutation";
import { RootState } from "../../../store/store";
import React from "react";
import { IMyProfileData, IUserProfileData } from "../../../api/apiType";

interface IProps {
  item: IUserProfileData;
  myProfile: IMyProfileData | undefined;
}

export const useSearchItem = ({ item, myProfile }: IProps) => {
  const searchKeyword = useSelector(
    (state: RootState) => state.search.searchKeyword
  );

  const { mutate: followMuate } = useFollowMutation();
  const { mutate: unfollowMuate } = useUnfollowMutation();

  const isFollow = myProfile!.followingList.includes(item.uid);

  const followHandler = () => {
    followMuate({ myUid: myProfile!.uid, userUid: item.uid });
  };

  const unfollowHandler = () => {
    unfollowMuate({ myUid: myProfile!.uid, userUid: item.uid });
  };

  // 검색 텍스트 하이라이트 효과
  const getTextHighLight = (text: string) => {
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

  return { isFollow, followHandler, unfollowHandler, getTextHighLight, isMe };
};
