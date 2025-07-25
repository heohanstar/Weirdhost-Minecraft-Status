import Swal from "sweetalert2";

export const alertOk = (title, text = "") =>
  Swal.fire({ icon: "success", title, text, confirmButtonColor: "#2563eb" });

export const alertErr = (err) =>
  Swal.fire({
    icon: "error",
    title: "오류",
    html: err?.message || "알 수 없는 오류",
    confirmButtonColor: "#dc2626",
  });

export const alertInfo = (title, text = "") =>
  Swal.fire({ icon: "info", title, text, confirmButtonColor: "#2563eb" });
