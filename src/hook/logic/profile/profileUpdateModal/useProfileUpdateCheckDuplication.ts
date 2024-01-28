import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { fetchDuplication } from "../../../../api/firebase/validationAPI";
import { displayNameRegex } from "../../../../library/validationRegex";
import { IMyProfileData } from "../../../../types/apiTypes";

interface IProps {
  myProfile: IMyProfileData;
}

export const useProfileUpdateCheckDuplication = ({ myProfile }: IProps) => {
  const [checkDuplication, setCheckDuplication] = useState(true);

  const { setError } = useFormContext();

  const checkDuplicationActiveHanlder = () => {
    setCheckDuplication(true);
  };

  const checkDuplicationHandler = useCallback(
    debounce(async (value: string) => {
      if (value === myProfile.displayName || "") {
        return;
      }

      if (value.match(displayNameRegex)) {
        try {
          await fetchDuplication(value, "DISPLAYNAME");
          checkDuplicationActiveHanlder();
        } catch (error: any) {
          return setError("displayName", {
            type: "validate",
            message: error?.message
          });
        }
      }
    }, 500),
    []
  );

  const resetCheckDuplication = () => {
    setCheckDuplication(false);
  };

  return { checkDuplication, resetCheckDuplication, checkDuplicationHandler };
};
