import { useState } from "react";
import { storage } from "../utils/storage";

const PASSWORD_ENABLED =
  String(import.meta.env.VITE_PASSWORD_ENABLED ?? "")
    .trim()
    .toLowerCase() === "true";
const DASH_PASSWORD = import.meta.env.VITE_DASH_PASSWORD ?? "";

export function useAuth() {
  if (storage.get() !== DASH_PASSWORD) storage.remove();
  const [authed, setAuthed] = useState(() => {
    if (!PASSWORD_ENABLED) return true;
    if (!DASH_PASSWORD) return false;
    return storage.get() === DASH_PASSWORD;
  });

  function verify(pw) {
    if (pw === DASH_PASSWORD) {
      storage.set(pw);
      setAuthed(true);
      return true;
    }
    return false;
  }

  return { authed, verify, enabled: PASSWORD_ENABLED };
}
