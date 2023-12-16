import React from "react";
import Header from "../../../component/commons/layouts/header/Header";
import { useLocation } from "react-router-dom";

export default function ShareTasteMapHeader() {
  const { pathname } = useLocation();
  const isProfilePage = pathname.includes("profile");

  return isProfilePage ? <Header type='tasteMap' /> : null;
}
