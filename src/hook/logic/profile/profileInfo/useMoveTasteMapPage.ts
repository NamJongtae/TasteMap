import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../../store/store";

export const useMoveTasteMapPage = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const myInfo = useSelector((state: RootState) => state.user.myInfo);

  const moveTasteMapPageHandler = () => {
    if (!uid || uid === myInfo.uid) {
      navigate("/profile/tasteMap");
    } else {
      navigate(`/tastemap/share/${uid}`);
    }
  };

  return { moveTasteMapPageHandler };
};
