import React, { useLayoutEffect, useState } from "react";
import { IProfileData } from "../../../api/apiType";
import {
  FollowBtn,
  SearchLi,
  UserImg,
  UserProfileLink,
  Username
} from "./search.styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  thunkFetchFollow,
  thunkFetchUnfollow
} from "../../../slice/profileSlice";
import { resolveWebp } from "../../../library/webpSupport";

interface IProps {
  item: IProfileData;
}
export default function SearchItem({ item }: IProps) {
  const searchKeyword = useSelector(
    (state: RootState) => state.search.searchKeyword
  );
  const myProfileData = useSelector(
    (state: RootState) => state.profile.myProfileData
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isFollow, setIsFollow] = useState(false);

  const onClickFollow = () => {
    if (myProfileData.uid && item.uid) {
      dispatch(
        thunkFetchFollow({ myUid: myProfileData.uid, userUid: item.uid })
      );
      setIsFollow(true);
    }
  };

  const onClickUnFollow = () => {
    if (myProfileData.uid && item.uid) {
      dispatch(
        thunkFetchUnfollow({ myUid: myProfileData.uid, userUid: item.uid })
      );
      setIsFollow(false);
    }
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

  useLayoutEffect(() => {
    if (item.uid && myProfileData.followerList?.includes(item.uid)) {
      setIsFollow(true);
    }
  }, [myProfileData]);
  return (
    <>
      {item.uid !== myProfileData.uid && (
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
          <FollowBtn
            isFollow={isFollow}
            onClick={isFollow ? onClickUnFollow : onClickFollow}
          >
            {isFollow ? "언팔로우" : "팔로우"}
          </FollowBtn>
        </SearchLi>
      )}
    </>
  );
}
