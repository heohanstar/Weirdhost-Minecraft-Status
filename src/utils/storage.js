const NS = "mc-dash-auth";

export const storage = {
  get: () => localStorage.getItem(NS),
  set: (val) => localStorage.setItem(NS, val),
  remove: () => localStorage.removeItem(NS),
};
