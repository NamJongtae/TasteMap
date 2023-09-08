import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom'
import { RootState } from './store/store';
import Login from './pages/login/Login';
function App () {
  const userData = useSelector((state: RootState) => state.user.data);
  return (
    <>
        <Routes>
            <Route
              path="/login"
              element={userData ? <Navigate to="/" /> : <Login />}
            />
        </Routes>
      </>
  )
}

export default App
