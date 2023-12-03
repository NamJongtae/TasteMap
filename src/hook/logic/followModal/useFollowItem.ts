import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useFollowMutation } from "../../query/profile/useFollowMutation";
import { useUnfollowMutation } from "../../query/profile/useUnfollowMutation";
import { useMyProfileQuery } from "../../query/profile/useMyProfileQuery";
import { IFollowData } from "../../../api/apiType";
import { userSlice } from "../../../slice/userSlice";

interface IProps {
  data: IFollowData;
  isFollower: boolean;
}

export const useFollowItem = ({ data, isFollower }: IProps) => {
  const { mutate: followMutate } = useFollowMutation();
  const { mutate: unfollowMutate } = useUnfollowMutation();
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const dispatch = useDispatch<AppDispatch>();
  const { data: myProfile } = useMyProfileQuery(myInfo.uid);

  const isFollow = myProfile?.followingList.includes(data.uid) || false;

  const unFollowHandler = () => {
    if (myProfile?.uid && data.uid) {
      unfollowMutate({ myUid: myProfile.uid, userUid: data.uid });
    }
  };

  const followHandler = () => {
    if (myProfile?.uid && data.uid) {
      followMutate({ myUid: myProfile.uid, userUid: data.uid });
    }
  };

  const closeFollowersModalHandler = () => {
    dispatch(userSlice.actions.setIsOpenFollowerModal(false));
  };

  const closeFollowingModalHandler = () => {
    dispatch(userSlice.actions.setIsOpenFollowingModal(false));
  };

  const profileLinkHandler = () => {
    if (isFollower) {
      closeFollowersModalHandler();
    } else {
      closeFollowingModalHandler();
    }
  };

  return {
    isFollow,
    myProfile,
    unFollowHandler,
    followHandler,
    profileLinkHandler
  };
};
