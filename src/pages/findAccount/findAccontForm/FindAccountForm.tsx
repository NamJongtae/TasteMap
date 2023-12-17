import React from "react";
import FindEmailForm from "./FindEmailForm/FindEmailForm";
import FindPasswordForm from "./FindPasswordForm/FindPasswordForm";

interface IProps {
  activeMenu: "email" | "password";
}
export default function FindAccountForm({ activeMenu }: IProps) {
  return activeMenu === "email" ? <FindEmailForm /> : <FindPasswordForm />;
}
