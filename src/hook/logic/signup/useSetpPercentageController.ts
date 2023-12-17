import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { signupSlice } from "../../../slice/signupSlice";
import { useFormContext } from "react-hook-form";

interface IProps {
  currentStep: string;
  steps: string[];
}
export const useStepProgressController = ({ currentStep, steps }: IProps) => {
  const percentage = useSelector((state: RootState) => state.signup.percentage);
  const checkEmailDuplication = useSelector(
    (state: RootState) => state.signup.checkEmailDuplication
  );
  const checkPhoneDuplication = useSelector(
    (state: RootState) => state.signup.checkPhoneDuplication
  );
  const checkDisplayNameDuplication = useSelector(
    (state: RootState) => state.signup.checkDisplayNameDuplication
  );
  const dispatch = useDispatch<AppDispatch>();

  const addPercentageHandler = (percentage: number) => {
    dispatch(signupSlice.actions.addPercentage(percentage));
  };

  const minusPercentageHandler = (percentage: number) => {
    dispatch(signupSlice.actions.minusPercentage(percentage));
  };

  const setpPerPercentage = 100 / steps.length;

  const { formState } = useFormContext();

  useEffect(() => {
    if (currentStep === steps[0])
      if (
        percentage < 50 &&
        !formState.errors.email &&
        !formState.errors.password &&
        !formState.errors.passwordChk &&
        !formState.errors.phone &&
        checkEmailDuplication &&
        checkPhoneDuplication
      ) {
        addPercentageHandler(setpPerPercentage);
      } else if (
        percentage > 0 &&
        (formState.errors.email ||
          formState.errors.password ||
          formState.errors.passwordChk ||
          formState.errors.phone ||
          !checkEmailDuplication ||
          !checkPhoneDuplication)
      ) {
        minusPercentageHandler(setpPerPercentage);
      }
  }, [currentStep, formState, checkEmailDuplication, checkPhoneDuplication]);

  useEffect(() => {
    if (currentStep === steps[1])
      if (
        percentage >= 50 &&
        !formState.errors.displayName &&
        checkDisplayNameDuplication
      ) {
        addPercentageHandler(setpPerPercentage);
      } else if (
        percentage > 50 &&
        (formState.errors.displayName || !checkDisplayNameDuplication)
      ) {
        minusPercentageHandler(setpPerPercentage);
      }
  }, [currentStep, formState, checkDisplayNameDuplication]);

  return { percentage };
};
