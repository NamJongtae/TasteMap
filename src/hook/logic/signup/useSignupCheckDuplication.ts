import { debounce } from "lodash";
import { useCallback } from "react";
import { fetchDuplication } from "../../../api/firebase/validationAPI";
import { useFormContext } from "react-hook-form";
import {
  displayNameRegex,
  emailRegex,
  phoneRegex
} from "../../../library/validationRegex";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { signupSlice } from "../../../slice/signupSlice";
import { TDuplication } from "../../../types/types";

interface IProps {
  type: TDuplication;
}

export const useSignupCheckDuplication = ({ type }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { setError } = useFormContext();

  const setCheckDuplication = () => {
    if (type === "EMAIL") {
      return "setCheckEmailDuplication";
    }
    if (type === "DISPLAYNAME") {
      return "setCheckDisplayNameDuplication";
    }
    return "setCheckPhoneDuplication";
  };

  const checkDuplicationActiveHanlder = () => {
    dispatch(signupSlice.actions[setCheckDuplication()](true));
  };

  const checkRegex = useCallback(() => {
    if (type === "EMAIL") {
      return emailRegex;
    }
    if (type === "DISPLAYNAME") {
      return displayNameRegex;
    }

    return phoneRegex;
  }, [type]);

  const checkDuplicationHandler = useCallback(
    debounce(async (value: string) => {
      if (value === "") {
        return;
      }

      if (value.match(checkRegex())) {
        try {
          await fetchDuplication(
            type === "PHONE" ? value.replace(/-/g, "") : value,
            type
          );
          checkDuplicationActiveHanlder();
        } catch (error: any) {
          return setError(type, {
            type: "validate",
            message: error?.message
          });
        }
      }
    }, 500),
    []
  );

  const resetCheckDuplication = () => {
    dispatch(signupSlice.actions[setCheckDuplication()](false));
  };

  return { resetCheckDuplication, checkDuplicationHandler };
};
