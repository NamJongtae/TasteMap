import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { IPostData } from "../../../../api/apiType";

export const useMoveToUpdatePage = () => {
  const navigate = useNavigate();

  const moveUpdatePageHandler = useCallback(
    (data: IPostData | undefined) => {
      if (data?.id) {
        navigate(`/post/${data.id}/edit`);
      }
    },
    [navigate]
  );

  return { moveUpdatePageHandler };
};
