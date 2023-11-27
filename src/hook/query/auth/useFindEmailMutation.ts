import { useMutation } from "@tanstack/react-query";
import { fetchFindEmail } from "../../../api/firebase/findAccountAPI";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";

export const useFindAccountMutation = () => {
  const { mutate, isPending, data, reset } = useMutation({
    mutationFn: ({
      displayName,
      phone
    }: {
      displayName: string;
      phone: string;
    }) => fetchFindEmail(displayName, phone),
    onError: (error) => {
      if (error.message.includes("일치하는 정보가 없습니다!")) {
        sweetToast(error.message, "warning");
      } else {
        sweetToast(
          "알 수 없는 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.",
          "warning"
        );
      }
    }
  });

  return { mutate, isPending, data, reset };
};
