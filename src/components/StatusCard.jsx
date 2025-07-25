import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useServerStatus } from "../hooks/useServerStatus";
import ControlButtons from "./ControlButtons";
import PlayerList from "./PlayerList";
import LoadingSpinner from "./LoadingSpinner";
import { stripColorCodes } from "../utils/format";
import { alertInfo } from "../utils/alert";

const MC_ADDRESS = import.meta.env.VITE_MC_ADDRESS;
const FALLBACK_ICON = import.meta.env.VITE_MC_FALLBACK_ICON || null;
const REFRESH_SEC = 10;

export default function StatusCard() {
  const { mc, pt, mcQuery } = useServerStatus();

  const online = pt?.attributes?.current_state === "running";

  const [left, setLeft] = useState(REFRESH_SEC);
  useEffect(() => setLeft(REFRESH_SEC), [mcQuery.dataUpdatedAt]);
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const infoShown = useRef(false);
  useEffect(() => {
    if (!infoShown.current && online && mc && mc.online === false) {
      alertInfo(
        "서버 정보가 아직 준비되지 않았습니다",
        "서버는 온라인이지만 아직 정보가 업데이트 되지 않았습니다. 정보가 업데이트 되는데 최대 3분 이상이 걸릴 수 있어요."
      );
      infoShown.current = true;
    }
    if (!online || (mc && mc.online)) infoShown.current = false;
  }, [online, mc]);

  if (mcQuery.isLoading)
    return <LoadingSpinner style={{ marginTop: "3rem" }} />;

  const version = online ? mc?.version ?? "-" : "-";

  const rawPlayers = online
    ? mc?.players?.list ?? mc?.players?.sample ?? []
    : [];
  const playerEntries = rawPlayers.map((p) =>
    typeof p === "string" ? { name: p } : { name: p.name, uuid: p.uuid }
  );
  const playersOnline = online
    ? mc?.players?.online ?? playerEntries.length
    : 0;
  const playersMax = online ? mc?.players?.max ?? "-" : "-";

  const iconSrc = `https://api.mcsrvstat.us/icon/${MC_ADDRESS}`;

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex" style={{ marginBottom: "1rem" }}>
        {iconSrc && (
          <img
            className="icon"
            src={iconSrc}
            alt="Server icon"
            onError={(e) => {
              if (FALLBACK_ICON) e.currentTarget.src = FALLBACK_ICON;
              else e.currentTarget.style.display = "none";
            }}
          />
        )}
        <div>
          <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>
            {stripColorCodes(
              mc?.motd?.clean?.join(" ") ||
                stripColorCodes(mc?.motd?.html || "") ||
                "서버"
            )}
          </div>
          <div style={{ fontSize: "0.9rem", color: "var(--slate-500)" }}>
            {MC_ADDRESS}
          </div>
        </div>
      </div>

      <ul className="list">
        <li style={{ textAlign: "center" }}>
          <span
            className={`badge ${online ? "badge-online" : "badge-offline"}`}
          >
            {online ? "온라인" : "오프라인"}
          </span>
        </li>
        <li>버전: {version}</li>
        <li>
          플레이어: {playersOnline}/{playersMax}
        </li>

        {online && playerEntries.length > 0 && (
          <li style={{ marginTop: "0.6rem" }}>
            접속자:
            <PlayerList players={playerEntries} />
          </li>
        )}
      </ul>

      <div className="refresh-timer">다음 갱신까지 {left}s</div>

      <ControlButtons online={online} />
    </motion.div>
  );
}
