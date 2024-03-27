import { api } from "@/core/api";
import { Game } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const getGameFn = async (gameId: string) => {
  const { data } = await api.get<Game>(`/api/games/${gameId}`);

  return data;
};

interface IUseGameOptions {
  id: string | null;
}

export const useGameQueryKey = ["game"];

export const useGame = ({ id }: IUseGameOptions) => {
  const query = useQuery<Game>({
    queryKey: ["game", id],
    enabled: !!id,
    queryFn: () => getGameFn(id!),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
};
