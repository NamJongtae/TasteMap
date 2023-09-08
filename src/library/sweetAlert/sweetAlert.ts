import Swal, { SweetAlertIcon } from "sweetalert2";
import "./sweetAlert.css";
import "sweetalert2/dist/sweetalert2.min.css";
export const sweetToast = (
  title: string,
  icon?: SweetAlertIcon,
  timer = 2000
) => {
  return Swal.fire({
    toast: true,
    title,
    position: "top",
    showConfirmButton: false,
    icon,
    timer
  });
};

export const sweetConfirm = (
  title: string,
  confirmButtonText: string,
  cancelButtonText:string,
  cb:()=>void
) => {
  return Swal.fire({
    title,
    showCloseButton: false,
    showCancelButton: true,
    focusConfirm: true,
    confirmButtonText,
    cancelButtonText
  }).then(({ isConfirmed }) => {
    if (isConfirmed) {
      cb();
    }
  });
};
