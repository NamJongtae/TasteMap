import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IParms {
  emailValid: boolean;
  passwordValid: boolean;
  passwordChkValid: boolean;
  phoneValid: boolean;
  displayNameValid: boolean;
}

export const useSignupStepController = ({
  emailValid,
  passwordValid,
  passwordChkValid,
  phoneValid,
  displayNameValid
}: IParms) => {
  const navigate = useNavigate();
  const [next, setNext] = useState(false);
  const [percentage, setPercentage] = useState("0%");
  const [completedUserInfoSetting, setCompletedUserInfoSetting] =
    useState(false);
  const [completedProfileSetting, setCompletedProfileSetting] = useState(false);

  const nextStepHandler = () => {
    setNext(true);
  };

  const prevStepHandler = () => {
    setPercentage("50%");
    setNext(false);
    setCompletedProfileSetting(false);
  };

  const cancelHandler = () => {
    navigate("/");
  };

  // 전체 input이 유효하다면 버튼 활성화
  useEffect(() => {
    if (emailValid && passwordValid && passwordChkValid && phoneValid) {
      setPercentage("50%");
      setCompletedUserInfoSetting(true);
    } else {
      setPercentage("0%");
      setCompletedUserInfoSetting(false);
    }
  }, [emailValid, passwordValid, passwordChkValid, phoneValid]);

  useEffect(() => {
    if (displayNameValid && next) {
      setPercentage("100%");
      setCompletedProfileSetting(true);
    } else if (!displayNameValid && next) {
      setPercentage("50%");
      setCompletedProfileSetting(false);
    }
  }, [displayNameValid, next]);

  return {
    next,
    setNext,
    percentage,
    setPercentage,
    nextStepHandler,
    prevStepHandler,
    cancelHandler,
    completedUserInfoSetting,
    completedProfileSetting
  };
};
