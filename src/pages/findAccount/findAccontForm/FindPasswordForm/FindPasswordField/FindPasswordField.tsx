import React from "react";
import FindPasswordEmailField from "./FindPasswordEmailField/FindPasswordEmailField";
import FindPasswordPhoneField from "./FindPasswordPhoneField/FindPasswordPhoneField";

export default function FindPasswordField() {
  return (
    <>
      <FindPasswordEmailField />
      <FindPasswordPhoneField />
    </>
  );
}
