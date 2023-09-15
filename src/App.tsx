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
import PostEdit from "./pages/post/postEdit/PostEdit";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 유저 최신 데이터 갱신
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      // locatlstroage에 유저 정보 저장
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL
        })
      );
      dispatch(
        userSlice.actions.setUser({
          uid: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL
        })
      );
    });
  }, []);

  return (
    <>
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
            path='/post/'
            element={!userData.uid ? <Navigate to='/login' /> : <Outlet />}
          >
            <Route path='upload' element={<PostUpload isEdit={false}/>} />
            <Route path=':postId/edit' element={<PostEdit />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
