import { useCallback, useEffect, useState } from "react";
import { FieldValues, UseFormReset } from "react-hook-form";

interface IProps {
  nicknameOrEmail: string;
  phone: string;
  reset: UseFormReset<FieldValues>;
  isError: Error | null;
}

export const useFindAccountError = ({
  nicknameOrEmail,
  phone,
  isError,
  reset
}: IProps) => {
  const [error, setError] = useState("");

  const handleErrorMsg = useCallback((errorMsg: string) => {
    if (
      errorMsg.includes("닉네임 또는 휴대폰 번호가 일치하지 않습니다.") ||
      errorMsg.includes("이메일 또는 휴대폰 번호가 일치하지 않습니다.")
    ) {
      return errorMsg;
    } else {
      return "알 수 없는 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요.";
    }
  }, []);

  useEffect(() => {
    if (nicknameOrEmail || phone) {
      setError("");
    }
  }, [nicknameOrEmail, phone]);

  useEffect(() => {
    if (isError) {
      const errorMsg = handleErrorMsg(isError.message);
      setError(errorMsg);
      reset();
    }
  }, [isError, reset]);

  return { error };
};
