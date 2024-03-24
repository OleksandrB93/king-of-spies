import { api } from "@/core/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGameQueryKey } from "./use-games-query";

const createGameFn = async (game: any) => {
  const { data } = await api.post<any>("/api/game", game);

  return data;
};

export const useCreateGameMutation = () => {
  const querryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createGameFn,
    onSettled: () => {
      querryClient.invalidateQueries({ queryKey: useGameQueryKey });
    },
  });

  return mutation;
};
