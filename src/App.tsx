import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "./store/store";
import Login from "./pages/login/Login";
import DefaultInfo from "./pages/signup/DefaultInfo.container";
import { detectWebpSupport } from "./library/webpSupport";
import FindAccount from "./pages/findAccount/FindAccount.container";
import Home from "./pages/home/Home";
import PostUpload from "./pages/postUpload/PostUpload.container";
import { userSlice } from "./slice/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PostEdit from "./pages/postEdit/PostEdit";
import Profile from "./pages/profile/Profile";
import MyTasteMap from "./pages/profile/myTasteMap/MyTasteMap.container";
import NotFound from "./pages/404/NotFound";
import Search from "./compoent/units/search/Search";
import ShareTasteMap from "./pages/shareTasteMap/ShareTasteMap";
import { Helmet } from "react-helmet-async";

function App() {
  const { pathname } = useLocation();
  const userData = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch<AppDispatch>();
  // webp 지원유무가 확인 되었을때 컴포넌트를 렌더링 시키위해 사용
  const [webpChecked, setWebpChecked] = useState(false);

  const checkwebp = async () => {
    const webpSupport = await detectWebpSupport();
    if (webpSupport) {
      document.body.classList.add("webp");
    } else {
      document.body.classList.add("no-webp");
    }
    // webp 지원 유무가 확인되었다면 true로 설정
    setWebpChecked(true);
  };

  // webp 지원 유무 확인
  useEffect(() => {
    checkwebp();
  }, []);

  // 페이지 이동 시 스크롤이 최상위로 가도록 설정
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 유저 최신 데이터 갱신
  useEffect(() => {
    // 맛집 지도 공유 페이지에서는 로그인 없이 들어올 수 있기 때문에 userData 저장을 하면 안되기 때문에
    // pathname에 shaer가 포함되는 경우 return 처리
    if(pathname.includes("share")) return;
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      // locatlstroage에 유저 정보 저장
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL || process.env.REACT_APP_DEFAULT_PROFILE_IMG
        })
      );
      dispatch(
        userSlice.actions.setUser({
          uid: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL || process.env.REACT_APP_DEFAULT_PROFILE_IMG
        })
      );
    });
  }, []);

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
      {webpChecked && (
        <Routes>
          <Route
            path='/login'
            element={userData.uid ? <Navigate to='/' /> : <Login />}
          />
          <Route
            path='/signup'
            element={userData.uid ? <Navigate to='/' /> : <DefaultInfo />}
          />
          <Route
            path='/findAccount'
            element={userData.uid ? <Navigate to='/' /> : <FindAccount />}
          />
          <Route
            path='/'
            element={!userData.uid ? <Navigate to='/login' /> : <Home />}
          />
          <Route
            path='/'
            element={!userData.uid ? <Navigate to='/login' /> : <Home />}
          />
          <Route
            path='/post/'
            element={!userData.uid ? <Navigate to='/login' /> : <Outlet />}
          >
            <Route path='upload' element={<PostUpload isEdit={false} />} />
            <Route path=':postId/edit' element={<PostEdit />} />
          </Route>
          <Route
            path='/profile'
            element={!userData.uid ? <Navigate to='/login' /> : <Outlet />}
          >
            <Route index element={<Profile />} />
            <Route path=':uid/' element={<Profile />} />
            <Route
              path='tasteMap'
              element={
                !userData.uid ? <Navigate to='/login' /> : <MyTasteMap />
              }
            />
          </Route>
          <Route path='/tasteMap/share/:uid' element={<ShareTasteMap />} />
          <Route path='/search' element={<Search />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

export default App;
