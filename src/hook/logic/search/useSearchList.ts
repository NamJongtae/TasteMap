import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect } from "react";
import { IUserProfileData } from "../../../api/apiType";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult
} from "@tanstack/react-query";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

interface InfiniteSearchType {
  userDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IUserProfileData[];
}

interface IProps {
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<InfiniteSearchType, unknown>,
      Error
    >
  >;
  hasNextPage: boolean;
  searchResult: IUserProfileData[] | undefined;
}

export const useSearchList = ({
  fetchNextPage,
  hasNextPage,
  searchResult
}: IProps) => {
  const searchKeyword = useSelector(
    (state: RootState) => state.search.searchKeyword
  );

  const [infiniteScrollRef, inview] = useInView();
  const pagePerData = useSelector(
    (state: RootState) => state.search.pagePerData
  );

  useEffect(() => {
    if (
      (searchKeyword && searchResult?.length) ||
      (0 >= pagePerData && inview && hasNextPage)
    ) {
      fetchNextPage();
    }
  }, [inview]);

  return { searchKeyword, infiniteScrollRef };
};
