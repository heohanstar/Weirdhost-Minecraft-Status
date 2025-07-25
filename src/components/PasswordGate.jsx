import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

export default function PasswordGate({ verify }) {
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [wrong, setWrong] = useState(false);

  const submit = () => {
    setBusy(true);
    const ok = verify(pw);
    setTimeout(() => {
      setBusy(false);
      setWrong(!ok);
    }, 300);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="gate-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="gate-box"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: "1.2rem" }}>
            비밀번호 입력
          </h2>
          <input
            className="gate-input"
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
          <button className="gate-btn" onClick={submit} disabled={busy}>
            {busy ? <LoadingSpinner white /> : "확인"}
          </button>
          {wrong && <p className="gate-error">잘못된 비밀번호입니다.</p>}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
