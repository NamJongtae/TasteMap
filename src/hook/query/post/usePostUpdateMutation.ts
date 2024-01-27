import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { updatePost, uploadPostImg } from "../../../api/firebase/postAPI";
import { IPostUpdateData, IPostData } from "../../../api/apiType";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { useNavigate } from "react-router-dom";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { HOME_POSTS_QUERYKEY } from "../../../querykey/querykey";

type InfinitePostsType = {
  postDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

export const usePostUpdateMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      prevPostDataImgName,
      newPost
    }: {
      prevPostDataImgName: IPostData;
      newPost: IPostUpdateData;
    }) => {
      // img 프로퍼티는 이미지 firestore에 이미지를 저장하고
      // 저장한 이미지 파일의 url과 filename를 얻기위해 사용
      if (newPost.img) {
        const res = await uploadPostImg(newPost.img);
        newPost.imgURL = [...newPost.imgURL, ...res.url];
        newPost.imgName = [...newPost.imgName, ...res.filename];
      }
      // 이미지 저장, 이미지 저장 데이터 적용 후
      // 이미지 파일 프로퍼티 삭제
      // 데이터 업로드시 파일 프로퍼티는 업로드할 필요가 없음
      delete newPost.img;
      await updatePost(prevPostDataImgName, newPost);
      return newPost as IPostData;
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: HOME_POSTS_QUERYKEY
      });
      const previousPosts:
        | InfiniteData<InfinitePostsType, unknown>
        | undefined = queryClient.getQueryData(HOME_POSTS_QUERYKEY);

      const updatedPages = previousPosts?.pages.map(
        (page: InfinitePostsType) => {
          return {
            ...page,
            data: page.data.map((post: IPostData) =>
              post.id === data.newPost.id ? data.newPost : post
            )
          };
        }
      );

      queryClient.setQueryData(
        HOME_POSTS_QUERYKEY,
        (data: InfiniteData<InfinitePostsType, unknown>) => ({
          ...data,
          pages: updatedPages
        })
      );
      return { previousPosts };
    },
    onError: (error, data, ctx) => {
      if (ctx) {
        queryClient.setQueryData(HOME_POSTS_QUERYKEY, ctx.previousPosts);
      }

      if (error.message === "게시물이 존재하지 않습니다.") {
        sweetToast("삭제된 게시물입니다!", "warning");
        // 게시물 삭제
        queryClient.setQueryData(
          HOME_POSTS_QUERYKEY ,
          (postsData: InfiniteData<InfinitePostsType, unknown>) => ({
            ...postsData,
            pages: postsData.pages.map((page: InfinitePostsType) => ({
              ...page,
              data: page.data.filter(
                (post: IPostData) => post.id !== data.newPost.id
              )
            }))
          })
        );
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
        console.log(error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: HOME_POSTS_QUERYKEY });
      navigate("/");
    }
  });

  return { mutate, isPending };
};
