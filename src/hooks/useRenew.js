import { useMutation } from "@tanstack/react-query";
import { renewServer } from "../api/pterodactyl";
import { alertOk, alertErr } from "../utils/alert";

export function useRenew() {
  return useMutation({
    mutationFn: renewServer,

    onSuccess: () =>
      alertOk("시간 연장 완료", "서버 사용 시간이 갱신되었습니다."),

    onError: (err) => {
      const raw = err?.message || String(err);

      if (
        raw.includes(
          "You can't renew your server currently, because you can only once at one time period"
        )
      ) {
        alertErr(
          new Error(
            "현재 시간 연장을 할 수 없습니다.<br/>하루에 한 번만 연장 할 수 있습니다."
          )
        );
      } else {
        alertErr(err);
      }
    },
  });
}
