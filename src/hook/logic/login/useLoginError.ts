import { useCallback, useEffect, useState } from "react";
import { FieldValues, UseFormReset } from "react-hook-form";

interface IProps {
  email: string;
  password: string;
  reset: UseFormReset<FieldValues>;
  isError: Error | null;
}

export const useLoginError = ({ email, password, reset, isError }: IProps) => {
  const [error, setError] = useState("");

  const handleErrorMsg = useCallback((errorMsg: string) => {
    if (errorMsg.includes("auth/invalid-email")) {
      return "유효하지 않은 이메일 형식 입니다.";
    }
    if (errorMsg.includes("auth/missing-email")) {
      return "이메일이 입력되지않았습니다.";
    }
    if (
      errorMsg.includes("auth/user-not-found") ||
      errorMsg.includes("auth/wrong-password")
    ) {
      return "이메일 또는 비밀번호가 일치하지 않습니다.";
    }
    if (errorMsg.includes("auth/too-many-requests")) {
      return "많은 로그인 시도로 로그인이 일시적으로 제한되었습니다.";
    }
    return "알 수 없는 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요.";
  }, []);

  useEffect(() => {
    if (email || password) {
      setError("");
    }
  }, [email, password]);

  useEffect(() => {
    if (isError) {
      const errorMsg = handleErrorMsg(isError.message);
      setError(errorMsg);
      reset();
    }
  }, [isError, reset]);

  return { error };
};
