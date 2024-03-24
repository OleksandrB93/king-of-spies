import { api } from "@/core/api";
import { Game } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const getGameFn = async () => {
  const { data } = await api.get<any>("/api/game");

  return data;
};

interface UseGameOptions {
  initialData?: Game[];
}

export const useGameQueryKey = ["game"];

export const useGmae = ({ initialData }: UseGameOptions = {}) => {
  const query = useQuery({
    queryKey: useGameQueryKey,
    queryFn: getGameFn,
    initialData,
  });

  return query;
};
