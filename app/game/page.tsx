"use client";
import CreateGameComponent from "@/components/create-game-component";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const CreateGame = () => {
  const session = useSession();

  return (
    <div>
      {session.status === "unauthenticated" ? (
        redirect("/")
      ) : (
        <div>
          <CreateGameComponent />
        </div>
      )}
    </div>
  );
};

export default CreateGame;
