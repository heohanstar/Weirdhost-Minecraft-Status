export async function fetchMcStatus(address) {
  let res = await fetch(`https://api.mcsrvstat.us/3/${address}`);
  if (!res.ok) {
    res = await fetch(`https://api.mcsrvstat.us/2/${address}`);
  }
  if (!res.ok) throw new Error("MC status fetch failed");
  return res.json();
}
