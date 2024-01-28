import React from "react";
import FindEmailForm from "./FindEmailForm/FindEmailForm";
import FindPasswordForm from "./FindPasswordForm/FindPasswordForm";
import { TFindAccountMenu } from "../../../types/types";

interface IProps {
  activeMenu: TFindAccountMenu;
}
export default function FindAccountForm({ activeMenu }: IProps) {
  return activeMenu === "EMAIL" ? <FindEmailForm /> : <FindPasswordForm />;
}
