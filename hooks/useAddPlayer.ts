import { create } from 'zustand'

interface PlayerStore {
  players: string[];
  addPlayer: (playerName: string) => void;
}

export const useAddPlayer = create<PlayerStore>((set) => ({
  players: [],
  addPlayer: (playerName: string) =>
    set((state) => ({ players: [...state.players, playerName] })),
}));
