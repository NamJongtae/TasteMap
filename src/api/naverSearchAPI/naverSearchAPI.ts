import axios from "axios";
import { IMapData } from "../../types/apiTypes";

// cors에러 우회를 위한 proxy 사용
const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
const URL = `${PROXY}/v1/search/local.json`;

/**
 * 네이버 지역 검색 API 사용 함수
 */
export const fetchMap = async (keyword: string): Promise<IMapData[]> => {
  try {
    const res = await axios.get(URL, {
      headers: {
        "X-Naver-Client-Id": process.env.REACT_APP_X_Naver_Client_Id,
        "X-Naver-Client-Secret": process.env.REACT_APP_X_Naver_Client_Secret
      },
      params: {
        query: keyword + "맛집", // 검색어 + 맛집 통해 맛집 겅색
        start: 1, // 시작 페이지
        display: 5 // 한 페이지 당 나오는 데이터 수
      }
    });
    // 검색된 제목의 html 태그와 엔티티 코드를 제거
    const filterTitleRes = res.data.items.map((item: IMapData) => {
      return {
        ...item,
        title:
          item.title &&
          item.title.replace(/<[^>]+>|&[^;]+;/g, "").replace(/&[^;]+;/g, "")
      };
    });

    return filterTitleRes;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
