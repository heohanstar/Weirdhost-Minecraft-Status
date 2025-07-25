import { useMutation, useQueryClient } from "@tanstack/react-query";
import { powerSignal } from "../api/pterodactyl";
import { alertOk, alertErr } from "../utils/alert";

export function usePowerOps() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => powerSignal("start"),
    onSuccess: () => {
      alertOk("서버 시작 요청이 전송되었습니다", "잠시 후 접속할 수 있어요.");
      qc.invalidateQueries({ queryKey: ["pt", "resources"] });
    },
    onError: alertErr,
  });
}
