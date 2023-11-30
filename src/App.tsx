import React, { useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login/Login";
import DefaultInfo from "./pages/signup/DefaultInfo.container";
import FindAccount from "./pages/findAccount/FindAccount.container";
import Home from "./pages/home/Home";
import PostUpload from "./pages/postUpload/PostUpload.container";
import PostEdit from "./pages/postEdit/PostEdit";
import Profile from "./pages/profile/Profile";
import MyTasteMap from "./pages/profile/myTasteMap/MyTasteMap.container";
import NotFound from "./pages/404/NotFound";
import Search from "./pages/search/Search";
import ShareTasteMap from "./pages/shareTasteMap/ShareTasteMap";
import { Helmet } from "react-helmet-async";
import { useAuthQuery } from "./hook/query/auth/useAuthQuery";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { userSlice } from "./slice/userSlice";
import Loading from "./component/commons/loading/Loading";
import { useSupportedWebp } from "./hook/useSupportedWebp";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();

  const { isWebpSupported } = useSupportedWebp();

  // 페이지 이동 시 스크롤이 최상위로 가도록 설정
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 저장된 유저 정보 사용
  let myInfo = useSelector((state: RootState) => state.user.myInfo);

  // 유저 최신 데이터 갱신
  const { data, isPending, isError, isSuccess } = useAuthQuery();
  if (data && data.uid) {
    myInfo = data;
  }
  useEffect(() => {
    if (isSuccess && data && data.uid) {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(userSlice.actions.setMyInfo(data));
    }
  }, [isSuccess, data]);

  if (isError) {
    return (
      <p style={{ textAlign: "center" }}>
        계정을 불러올 수 없습니다. 재로그인 하시거나, 잠시 후 다시 시도해주세요.
      </p>
    );
  }

  if ((isPending && pathname === "/login") || isWebpSupported === null) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <meta property='og:title' content='TasteMap' />
        <meta property='og:type' content='webpsite' />
        <meta property='og:url' content='https://tasteMap.site/' />
        <meta
          property='og:image'
          content='https://firebasestorage.googleapis.com/v0/b/tastemap-c9a2a.appspot.com/o/images%2Fog%2Fog-img.png?alt=media&token=d4503b8e-af9e-4d6b-9367-268973d3104d&_gl=1*179wgyn*_ga*MTY1NzkxNDYxOC4xNjg4NTU5ODMy*_ga_CW55HF8NVT*MTY5NjQyMTkyOS4yMDEuMS4xNjk2NDIxOTcyLjE3LjAuMA..'
        />
        <meta
          property='og:description'
          content={
            "맛집을 공유하고 자신의 맛집 지도를 완성시켜가는 SNS 플랫폼\n나만의 맛집 지도를 만들고 공유해 보세요."
          }
        />
      </Helmet>
      {isWebpSupported!==null && (
        <Routes>
          <Route
            path='/login'
            element={myInfo.uid ? <Navigate to='/' /> : <Login />}
          />
          <Route
            path='/signup'
            element={myInfo.uid ? <Navigate to='/' /> : <DefaultInfo />}
          />
          <Route
            path='/findAccount'
            element={myInfo.uid ? <Navigate to='/' /> : <FindAccount />}
          />
          <Route
            path='/'
            element={!myInfo.uid ? <Navigate to='/login' /> : <Home />}
          />
          <Route
            path='/post/'
            element={!myInfo.uid ? <Navigate to='/login' /> : <Outlet />}
          >
            <Route path='upload' element={<PostUpload isEdit={false} />} />
            <Route path=':postId/edit' element={<PostEdit />} />
          </Route>
          <Route
            path='/profile'
            element={!myInfo.uid ? <Navigate to='/login' /> : <Outlet />}
          >
            <Route index element={<Profile />} />
            <Route path=':uid/' element={<Profile />} />
            <Route
              path='tasteMap'
              element={!myInfo.uid ? <Navigate to='/login' /> : <MyTasteMap />}
            />
          </Route>
          <Route path='/tasteMap/share/:uid' element={<ShareTasteMap />} />
          <Route
            path='/search'
            element={!myInfo.uid ? <Navigate to='/login' /> : <Search />}
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

export default App;
