import { useEffect } from "react";
import { IPostData } from "../../../types/apiTypes";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface IProps {
  post: IPostData | undefined;
}
export const useCheckVaildationUser = ({ post }: IProps) => {
  const navigate = useNavigate();
  const myInfo = useSelector((state: RootState) => state.user.myInfo);

  /**
   * 게시물 수정 사용자 확인 */
  const checkVaildationUser = () => {
    if (post) {
      if (post?.uid !== myInfo.uid) {
        sweetToast("다른 사용자의 게시물은 수정할 수 없습니다!", "warning");
        navigate("/", { replace: true });
      }
    }
  };

  useEffect(() => {
    checkVaildationUser();
  }, [post]);
};
