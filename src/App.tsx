import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { RootState } from "./store/store";
import Login from "./pages/login/Login";
import DefaultInfo from "./pages/signup/DefaultInfo.container";
import { detectWebpSupport } from "./library/webpSupport";
function App() {
  const userData = useSelector((state: RootState) => state.user.data);
  // webp 지원유무가 확인 되었을때 컴포넌트를 렌더링 시키위해 사용
  const [webpChecked, setWebpChecked] = useState(false);

  const checkwebp = async () => {
    const webpSupport = await detectWebpSupport();
    if (webpSupport) {
      document.body.classList.add("webp");
    } else {
      document.body.classList.add("no-webp");
    }
    // webp 지원유무가 확인되었다면 true로 설정
    setWebpChecked(true);
  };

  useEffect(() => {
    checkwebp();
  }, []);

  return (
    <>
      {webpChecked && (
        <Routes>
          <Route
            path='/login'
            element={userData ? <Navigate to='/' /> : <Login />}
          />
          <Route
            path='/signup'
            element={userData ? <Navigate to='/' /> : <DefaultInfo />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
