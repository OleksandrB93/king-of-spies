import { useAddPlayer } from "@/hooks/useAddPlayer";

export const ListInvitaionComponent = () => {
  const { players } = useAddPlayer();

  return (
    <div className="flex flex-col rounded-md p-4 bg-black/60">
      <h2 className="text-2xl">Players</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
  );
};
