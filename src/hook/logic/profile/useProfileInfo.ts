import { useNavigate, useParams } from "react-router-dom";
import { IMyProfileData, IUserProfileData } from "../../../api/apiType";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFollowMutation } from "../../query/profile/useFollowMutation";
import { useUnfollowMutation } from "../../query/profile/useUnfollowMutation";
import { userSlice } from "../../../slice/userSlice";

interface IProps {
  myProfile: IMyProfileData;
  userProfile: IUserProfileData;
}

export const useProfileInfo = ({ myProfile, userProfile }: IProps) => {
  const { uid } = useParams();

  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const navigate = useNavigate();
  const introduecRef = useRef<HTMLParagraphElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [isShowMoreTextBtn, setIsShowMoreTextBtn] = useState(false);

  const { mutate: followMutate } = useFollowMutation();
  const { mutate: unfollowMutate } = useUnfollowMutation();

  const isFollow = myProfile.followingList?.includes(userProfile.uid);

  const followHandler = async () => {
    if (myInfo.uid && userProfile.uid) {
      followMutate({ myUid: myInfo.uid, userUid: userProfile.uid });
    }
  };

  const unfollowHandler = async () => {
    if (myInfo.uid && userProfile.uid) {
      unfollowMutate({
        myUid: myInfo.uid,
        userUid: userProfile.uid
      });
    }
  };

  const openFollowerModalHandler = () => {
    dispatch(userSlice.actions.setIsOpenFollowerModal(true));
  };

  const openFollowingModalHandler = () => {
    dispatch(userSlice.actions.setIsOpenFollowingModal(true));
  };

  const openProfileUpdateModalHandler = () => {
    dispatch(userSlice.actions.setIsOpenUpdateProfileModal(true));
  };

  const openMoreTextHandler = () => {
    if (introduecRef.current) {
      introduecRef.current.style.display = "block";
      setIsShowMoreTextBtn(false);
    }
  };

  const moveTasteMapPageHandler = () => {
    if (!uid || uid === myInfo.uid) {
      navigate("/profile/tasteMap");
    } else {
      navigate(`/tastemap/share/${uid}`);
    }
  };

  useEffect(() => {
    if (uid === myInfo.uid) {
      navigate("/profile", { replace: true });
    }
  }, [uid]);

  useLayoutEffect(() => {
    if (introduecRef.current && myProfile.uid) {
      if (introduecRef.current?.clientHeight >= 63) {
        setIsShowMoreTextBtn(true);
      } else {
        setIsShowMoreTextBtn(false);
      }
    }
  }, [userProfile, myProfile.uid]);

  return {
    myInfo,
    isShowMoreTextBtn,
    isFollow,
    followHandler,
    unfollowHandler,
    openMoreTextHandler,
    openFollowerModalHandler,
    openFollowingModalHandler,
    openProfileUpdateModalHandler,
    moveTasteMapPageHandler,
    introduecRef,
    uid
  };
};
