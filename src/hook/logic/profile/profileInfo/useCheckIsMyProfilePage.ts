
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../../store/store";

export const useCheckIsMyProfilePage = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const myInfo = useSelector((state: RootState) => state.user.myInfo);

  useEffect(() => {
    if (uid === myInfo.uid) {
      navigate("/profile", { replace: true });
    }
  }, [uid]);
};
