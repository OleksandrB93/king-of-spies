"use client";
import PlayerCard from "@/components/player-card";
import { useGetUsersByEmails } from "@/hooks/get-user-by-email";
import { useGame } from "@/hooks/use-get-game-by-id";
import { User } from "@prisma/client";

import { useRouter } from "next/navigation";
interface IGameId {
  params: {
    id: string;
  };
}

const GamePage = ({ params }: IGameId) => {
  const router = useRouter();
  //get game
  const {
    data: game,
    isLoading,
    isError: isErrorGame,
    isSuccess,
  } = useGame({ id: params.id });
  if (isErrorGame) {
    router.push("/game");
    // some popup : "Game not found try a new game"
  }
  
  //get users
  const playerEmails = game?.playerEmails || [];
  const { data: users, isSuccess: isSuccessUser } =
    useGetUsersByEmails(playerEmails);

  return (
    <div>
      <p>Number of Spies: {game?.numberOfSpies}</p>
      {isSuccess && users?.length && (
        <ul className="flex justify-evenly flex-wrap gap-2">
          <>
            {users.map((user: User) => (
              <PlayerCard key={user.id} user={user} />
            ))}
          </>
        </ul>
      )}
    </div>
  );
};

export default GamePage;
