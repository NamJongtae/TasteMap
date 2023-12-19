import { v4 as uuid } from "uuid";
import { useCallback } from "react";
import { usePostUploadMutation } from "../../query/post/usePostUploadMutation";
import { IPostUploadData } from "../../../api/apiType";
import { Timestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { FieldValues } from "react-hook-form";

export const usePostUploadDataFetch = () => {
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const { mutate, isPending: uploadPostLoading } = usePostUploadMutation();

  /**
   * 게시물 업로드 함수 */
  const postUploadHandler = useCallback(
    async (
      data: FieldValues,
    ) => {
      // 내용이 비었거나 맛집을 선택하지 않았을 경우 return
      if (!data.content || !data.map) return;
      else {
        const id = uuid();
        // 서버로 보낼 postData 정의
        const uploadData: IPostUploadData = {
          id,
          content: data.content,
          img: data.img,
          uid: myInfo.uid,
          createdAt: Timestamp.fromDate(new Date()),
          likeCount: 0,
          commentCount: 0,
          reportCount: 0,
          reportUidList: [],
          mapData: data.map,
          isBlock: false,
          imgName: [],
          imgURL: [],
          rating: data.rating
        };
        mutate(uploadData);
      }
    },
    []
  );

  return { postUploadHandler, uploadPostLoading };
};
