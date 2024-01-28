import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { uploadPostImg, uploadPost } from "../../../api/firebase/postAPI";
import { IPostData, IPostUploadData } from "../../../types/apiTypes";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { HOME_POSTS_QUERYKEY } from "../../../querykey/querykey";

type FetchDataResponse = {
  postDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

export const usePostUploadMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (postData: IPostUploadData) => {
      // img 프로퍼티는 이미지 firestore에 이미지를 저장하고
      // 저장한 이미지 파일의 url과 filename를 얻기위해 사용
      if (postData.img) {
        try {
          const res = await uploadPostImg(postData.img);
          postData.imgURL = res.url;
          postData.imgName = res.filename;
        } catch (error) {
          // uploadPostImg에서 발생한 오류를 처리합니다.
          console.error("이미지를 가져오는 중 오류 발생:", error);
          throw error;
        }
      }

      // 이미지 저장, 이미지 저장 데이터 적용 후
      // 이미지 파일 프로퍼티 삭제
      // 데이터 업로드시 파일 프로퍼티는 업로드할 필요가 없음
      delete postData.img;

      await uploadPost(postData);
      return postData as IPostUploadData;
    },
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: HOME_POSTS_QUERYKEY });
      const previousPosts = await queryClient.getQueryData(HOME_POSTS_QUERYKEY);

      queryClient.setQueryData(
        HOME_POSTS_QUERYKEY,
        (data: InfiniteData<FetchDataResponse, unknown>) => ({
          ...data,
          pages: [
            {
              postDocs: data.pages[0].postDocs,
              data: [newPost, ...data.pages[0].data]
            },
            ...data.pages.slice(1)
          ]
        })
      );

      return { previousPosts };
    },
    onError: (error, data, ctx) => {
      if (ctx) {
        queryClient.setQueryData(HOME_POSTS_QUERYKEY, ctx.previousPosts);
      }

      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: HOME_POSTS_QUERYKEY
      });
      navigate("/");
    }
  });

  return { mutate, isPending };
};
