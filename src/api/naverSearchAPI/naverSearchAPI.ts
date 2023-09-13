import axios from "axios";
import { ISearchMapData } from "../apiType";

/**
 * 네이버 지역 검색 API 사용 함수
 */
export const fetchSearchData = async (
  keyword: string
): Promise<ISearchMapData[]> => {
  const res = await axios.get("/v1/search/local.json", {
    headers: {
      "X-Naver-Client-Id": process.env.REACT_APP_X_Naver_Client_Id,
      "X-Naver-Client-Secret": process.env.REACT_APP_X_Naver_Client_Secret
    },
    params: {
      query: keyword + "맛집", // 검색어 + 맛집 통해 맛집 겅색
      start: 1, // 시작 페이지
      display: 5, // 한 페이지 당 나오는 데이터 수
    }
  });
  // 검색된 제목의 html 태그와 엔티티 코드를 제거
  const filterTitleRes = res.data.items.map((item: ISearchMapData) => {
    return {
      ...item,
      title:
        item.title &&
        item.title.replace(/<[^>]+>|&[^;]+;/g, "").replace(/&[^;]+;/g, "")
    };
  });

  return filterTitleRes;
};
