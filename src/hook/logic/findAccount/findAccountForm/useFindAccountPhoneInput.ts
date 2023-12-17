import { FieldValues, UseFormSetValue, UseFormTrigger } from "react-hook-form";

interface IProps {
  setValue: UseFormSetValue<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
}
export const useFindAccountPhoneInput = ({ setValue, trigger }: IProps) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    const formattedValue = phoneValue
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    setValue("phone", formattedValue);
    trigger("phone");
  };

  return { handlePhoneChange };
};
