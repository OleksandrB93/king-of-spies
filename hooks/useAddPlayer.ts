import { create } from 'zustand'

interface PlayerStore {
  players: string[];
  addPlayer: (playerEmail: string) => void;
}

export const useAddPlayer = create<PlayerStore>((set) => ({
  players: [],
  addPlayer: (playerEmail: string) =>
    set((state) => ({ players: [...state.players, playerEmail] })),
}));
