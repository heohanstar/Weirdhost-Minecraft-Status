const PANEL_URL = import.meta.env.VITE_PANEL_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const SERVER_ID = import.meta.env.VITE_SERVER_ID;
const RENEW_UUID = import.meta.env.VITE_RENEW_UUID;

async function ptFetch(path, opts = {}) {
  const res = await fetch(`${PANEL_URL}${path}`, {
    ...opts,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
      ...(opts.headers || {}),
    },
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`PT ${res.status}: ${txt}`);
  }
  return res.status === 204 ? null : res.json();
}

export const getResources = () =>
  ptFetch(`/api/client/servers/${SERVER_ID}/resources`);

export const powerSignal = (signal) =>
  ptFetch(`/api/client/servers/${SERVER_ID}/power`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ signal }),
  });

export const renewServer = () =>
  ptFetch(`/api/client/freeservers/${RENEW_UUID}/renew`, { method: "POST" });
