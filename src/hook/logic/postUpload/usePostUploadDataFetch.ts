import { v4 as uuid } from "uuid";
import { useCallback } from "react";
import { usePostUploadMutation } from "../../query/post/usePostUploadMutation";
import { IMapData, IPostUploadData } from "../../../api/apiType";
import { Timestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export const usePostUploadDataFetch = () => {
  const myInfo = useSelector((state: RootState) => state.user.myInfo);

  const { mutate, isPending: uploadPostLoading } = usePostUploadMutation();
  

  /**
   * 게시물 업로드 함수 */
  const postUploadHandler = useCallback(
    async (
      content: string,
      rating: number,
      mapData: IMapData,
      img: File[]
    ) => {
      // 내용이 비었거나 맛집을 선택하지 않았을 경우 return
      if (!content || !mapData.mapx) return;
      else {
        const id = uuid();
        // 서버로 보낼 postData 정의
        const uploadData: IPostUploadData = {
          id,
          content,
          img,
          uid: myInfo.uid,
          createdAt: Timestamp.fromDate(new Date()),
          likeCount: 0,
          commentCount: 0,
          reportCount: 0,
          reportUidList: [],
          mapData,
          isBlock: false,
          imgName: [],
          imgURL: [],
          rating
        };

        mutate(uploadData);
      }
    },
    []
  );

  return { postUploadHandler, uploadPostLoading };
};
