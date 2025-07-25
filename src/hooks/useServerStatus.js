import { useQuery } from "@tanstack/react-query";
import { fetchMcStatus } from "../api/mcStatus";
import { getResources } from "../api/pterodactyl";

const MC_ADDRESS = import.meta.env.VITE_MC_ADDRESS;

export function useServerStatus() {
  const mcQuery = useQuery({
    queryKey: ["mc", MC_ADDRESS],
    queryFn: () => fetchMcStatus(MC_ADDRESS),
    refetchInterval: 10_000,
  });

  const ptQuery = useQuery({
    queryKey: ["pt", "resources"],
    queryFn: getResources,
    refetchInterval: 10_000,
    retry: false,
  });

  return { mc: mcQuery.data, pt: ptQuery.data, mcQuery, ptQuery };
}
